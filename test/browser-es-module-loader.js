(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (global.BrowserESModuleLoader = factory());
})(this, function() {
  'use strict';

  /*
 * Environment
 */
  var isBrowser =
    typeof window !== 'undefined' && typeof document !== 'undefined';
  var isNode =
    typeof process !== 'undefined' && process.versions && process.versions.node;
  var isWindows =
    typeof process !== 'undefined' &&
    typeof process.platform === 'string' &&
    process.platform.match(/^win/);

  var envGlobal = typeof self !== 'undefined' ? self : global;
  /*
 * Simple Symbol() shim
 */
  var hasSymbol = typeof Symbol !== 'undefined';
  function createSymbol(name) {
    return hasSymbol ? Symbol() : '@@' + name;
  }

  /*
 * Environment baseURI
 */
  var baseURI;

  // environent baseURI detection
  if (typeof document != 'undefined' && document.getElementsByTagName) {
    baseURI = document.baseURI;

    if (!baseURI) {
      var bases = document.getElementsByTagName('base');
      baseURI = (bases[0] && bases[0].href) || window.location.href;
    }
  } else if (typeof location != 'undefined') {
    baseURI = location.href;
  }

  // sanitize out the hash and querystring
  if (baseURI) {
    baseURI = baseURI.split('#')[0].split('?')[0];
    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
  } else if (typeof process != 'undefined' && process.cwd) {
    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd();
    if (isWindows) baseURI = baseURI.replace(/\\/g, '/');
  } else {
    throw new TypeError('No environment baseURI');
  }

  // ensure baseURI has trailing "/"
  if (baseURI[baseURI.length - 1] !== '/') baseURI += '/';

  /*
 * LoaderError with chaining for loader stacks
 */
  var errArgs = new Error(0, '_').fileName == '_';
  function LoaderError__Check_error_message_for_loader_stack(
    childErr,
    newMessage,
  ) {
    // Convert file:/// URLs to paths in Node
    if (!isBrowser)
      newMessage = newMessage.replace(
        isWindows ? /file:\/\/\//g : /file:\/\//g,
        '',
      );

    var message = (childErr.message || childErr) + '\n  ' + newMessage;

    var err;
    if (errArgs && childErr.fileName)
      err = new Error(message, childErr.fileName, childErr.lineNumber);
    else err = new Error(message);

    var stack = childErr.originalErr
      ? childErr.originalErr.stack
      : childErr.stack;

    if (isNode)
      // node doesn't show the message otherwise
      err.stack = message + '\n  ' + stack;
    else err.stack = stack;

    err.originalErr = childErr.originalErr || childErr;

    return err;
  }

  var resolvedPromise = Promise.resolve();

  /*
 * Simple Array values shim
 */
  function arrayValues(arr) {
    if (arr.values) return arr.values();

    if (typeof Symbol === 'undefined' || !Symbol.iterator)
      throw new Error('Symbol.iterator not supported in this browser');

    var iterable = {};
    iterable[Symbol.iterator] = function() {
      var keys = Object.keys(arr);
      var keyIndex = 0;
      return {
        next: function() {
          if (keyIndex < keys.length)
            return {
              value: arr[keys[keyIndex++]],
              done: false,
            };
          else
            return {
              value: undefined,
              done: true,
            };
        },
      };
    };
    return iterable;
  }

  /*
 * 3. Reflect.Loader
 *
 * We skip the entire native internal pipeline, just providing the bare API
 */
  // 3.1.1
  function Loader() {
    this.registry = new Registry();
  }
  // 3.3.1
  Loader.prototype.constructor = Loader;

  function ensureInstantiated(module) {
    if (!(module instanceof ModuleNamespace))
      throw new TypeError(
        'Module instantiation did not return a valid namespace object.',
      );
    return module;
  }

  // 3.3.2
  Loader.prototype.import = function(key, parent) {
    if (typeof key !== 'string')
      throw new TypeError(
        'Loader import method must be passed a module key string',
      );
    // custom resolveInstantiate combined hook for better perf
    var loader = this;
    return (
      resolvedPromise
        .then(function() {
          return loader[RESOLVE_INSTANTIATE](key, parent);
        })
        .then(ensureInstantiated)
        //.then(Module.evaluate)
        .catch(function(err) {
          throw LoaderError__Check_error_message_for_loader_stack(
            err,
            'Loading ' + key + (parent ? ' from ' + parent : ''),
          );
        })
    );
  };
  // 3.3.3
  var RESOLVE = (Loader.resolve = createSymbol('resolve'));

  /*
 * Combined resolve / instantiate hook
 *
 * Not in current reduced spec, but necessary to separate RESOLVE from RESOLVE + INSTANTIATE as described
 * in the spec notes of this repo to ensure that loader.resolve doesn't instantiate when not wanted.
 *
 * We implement RESOLVE_INSTANTIATE as a single hook instead of a separate INSTANTIATE in order to avoid
 * the need for double registry lookups as a performance optimization.
 */
  var RESOLVE_INSTANTIATE = (Loader.resolveInstantiate = createSymbol(
    'resolveInstantiate',
  ));

  // default resolveInstantiate is just to call resolve and then get from the registry
  // this provides compatibility for the resolveInstantiate optimization
  Loader.prototype[RESOLVE_INSTANTIATE] = function(key, parent) {
    var loader = this;
    return loader.resolve(key, parent).then(function(resolved) {
      return loader.registry.get(resolved);
    });
  };

  function ensureResolution(resolvedKey) {
    if (resolvedKey === undefined) throw new RangeError('No resolution found.');
    return resolvedKey;
  }

  Loader.prototype.resolve = function(key, parent) {
    var loader = this;
    return resolvedPromise
      .then(function() {
        return loader[RESOLVE](key, parent);
      })
      .then(ensureResolution)
      .catch(function(err) {
        throw LoaderError__Check_error_message_for_loader_stack(
          err,
          'Resolving ' + key + (parent ? ' to ' + parent : ''),
        );
      });
  };

  // 3.3.4 (import without evaluate)
  // this is not documented because the use of deferred evaluation as in Module.evaluate is not
  // documented, as it is not considered a stable feature to be encouraged
  // Loader.prototype.load may well be deprecated if this stays disabled
  /* Loader.prototype.load = function (key, parent) {
  return Promise.resolve(this[RESOLVE_INSTANTIATE](key, parent || this.key))
  .catch(function (err) {
    throw addToError(err, 'Loading ' + key + (parent ? ' from ' + parent : ''));
  });
}; */

  /*
 * 4. Registry
 *
 * Instead of structuring through a Map, just use a dictionary object
 * We throw for construction attempts so this doesn't affect the public API
 *
 * Registry has been adjusted to use Namespace objects over ModuleStatus objects
 * as part of simplifying loader API implementation
 */
  var iteratorSupport = typeof Symbol !== 'undefined' && Symbol.iterator;
  var REGISTRY = createSymbol('registry');
  function Registry() {
    this[REGISTRY] = {};
    this._registry = REGISTRY;
  }
  // 4.4.1
  if (iteratorSupport) {
    // 4.4.2
    Registry.prototype[Symbol.iterator] = function() {
      return this.entries()[Symbol.iterator]();
    };

    // 4.4.3
    Registry.prototype.entries = function() {
      var registry = this[REGISTRY];
      return arrayValues(
        Object.keys(registry).map(function(key) {
          return [key, registry[key]];
        }),
      );
    };
  }

  // 4.4.4
  Registry.prototype.keys = function() {
    return arrayValues(Object.keys(this[REGISTRY]));
  };
  // 4.4.5
  Registry.prototype.values = function() {
    var registry = this[REGISTRY];
    return arrayValues(
      Object.keys(registry).map(function(key) {
        return registry[key];
      }),
    );
  };
  // 4.4.6
  Registry.prototype.get = function(key) {
    return this[REGISTRY][key];
  };
  // 4.4.7
  Registry.prototype.set = function(key, namespace) {
    if (!(namespace instanceof ModuleNamespace))
      throw new Error(
        'Registry must be set with an instance of Module Namespace',
      );
    this[REGISTRY][key] = namespace;
    return this;
  };
  // 4.4.8
  Registry.prototype.has = function(key) {
    return Object.hasOwnProperty.call(this[REGISTRY], key);
  };
  // 4.4.9
  Registry.prototype.delete = function(key) {
    if (Object.hasOwnProperty.call(this[REGISTRY], key)) {
      delete this[REGISTRY][key];
      return true;
    }
    return false;
  };

  /*
 * Simple ModuleNamespace Exotic object based on a baseObject
 * We export this for allowing a fast-path for module namespace creation over Module descriptors
 */
  // var EVALUATE = createSymbol('evaluate');
  var BASE_OBJECT = createSymbol('baseObject');

  // 8.3.1 Reflect.Module
  /*
 * Best-effort simplified non-spec implementation based on
 * a baseObject referenced via getters.
 *
 * Allows:
 *
 *   loader.registry.set('x', new Module({ default: 'x' }));
 *
 * Optional evaluation function provides experimental Module.evaluate
 * support for non-executed modules in registry.
 */
  function ModuleNamespace(baseObject /*, evaluate*/) {
    Object.defineProperty(this, BASE_OBJECT, {
      value: baseObject,
    });

    // evaluate defers namespace population
    /* if (evaluate) {
    Object.defineProperty(this, EVALUATE, {
      value: evaluate,
      configurable: true,
      writable: true
    });
  }
  else { */
    Object.keys(baseObject).forEach(extendNamespace, this);
    //}
  }
  // 8.4.2
  ModuleNamespace.prototype = Object.create(null);

  if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
    Object.defineProperty(ModuleNamespace.prototype, Symbol.toStringTag, {
      value: 'Module',
    });

  function extendNamespace(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get: function() {
        return this[BASE_OBJECT][key];
      },
    });
  }

  /* function doEvaluate (evaluate, context) {
  try {
    evaluate.call(context);
  }
  catch (e) {
    return e;
  }
}

// 8.4.1 Module.evaluate... not documented or used because this is potentially unstable
Module.evaluate = function (ns) {
  var evaluate = ns[EVALUATE];
  if (evaluate) {
    ns[EVALUATE] = undefined;
    var err = doEvaluate(evaluate);
    if (err) {
      // cache the error
      ns[EVALUATE] = function () {
        throw err;
      };
      throw err;
    }
    Object.keys(ns[BASE_OBJECT]).forEach(extendNamespace, ns);
  }
  // make chainable
  return ns;
}; */

  /*
 * Optimized URL normalization assuming a syntax-valid URL parent
 */
  function throwResolveError() {
    throw new RangeError('Unable to resolve "' + relUrl + '" to ' + parentUrl);
  }
  function resolveIfNotPlain(relUrl, parentUrl) {
    var parentProtocol =
      parentUrl && parentUrl.substr(0, parentUrl.indexOf(':') + 1);

    var firstChar = relUrl[0];
    var secondChar = relUrl[1];

    // protocol-relative
    if (firstChar === '/' && secondChar === '/') {
      if (!parentProtocol) throwResolveError(relUrl, parentUrl);
      return parentProtocol + relUrl;
    }
    // relative-url
    else if (
      (firstChar === '.' &&
        (secondChar === '/' ||
          (secondChar === '.' && (relUrl[2] === '/' || relUrl.length === 2)) ||
          relUrl.length === 1)) ||
      firstChar === '/'
    ) {
      var parentIsPlain =
        !parentProtocol || parentUrl[parentProtocol.length] !== '/';

      // read pathname from parent if a URL
      // pathname taken to be part after leading "/"
      var pathname;
      if (parentIsPlain) {
        // resolving to a plain parent -> skip standard URL prefix, and treat entire parent as pathname
        if (parentUrl === undefined) throwResolveError(relUrl, parentUrl);
        pathname = parentUrl;
      } else if (parentUrl[parentProtocol.length + 1] === '/') {
        // resolving to a :// so we need to read out the auth and host
        if (parentProtocol !== 'file:') {
          pathname = parentUrl.substr(parentProtocol.length + 2);
          pathname = pathname.substr(pathname.indexOf('/') + 1);
        } else {
          pathname = parentUrl.substr(8);
        }
      } else {
        // resolving to :/ so pathname is the /... part
        pathname = parentUrl.substr(parentProtocol.length + 1);
      }

      if (firstChar === '/') {
        if (parentIsPlain) throwResolveError(relUrl, parentUrl);
        else
          return (
            parentUrl.substr(0, parentUrl.length - pathname.length - 1) + relUrl
          );
      }

      // join together and split for removal of .. and . segments
      // looping the string instead of anything fancy for perf reasons
      // '../../../../../z' resolved to 'x/y' is just 'z' regardless of parentIsPlain
      var segmented =
        pathname.substr(0, pathname.lastIndexOf('/') + 1) + relUrl;

      var output = [];
      var segmentIndex = undefined;

      for (var i = 0; i < segmented.length; i++) {
        // busy reading a segment - only terminate on '/'
        if (segmentIndex !== undefined) {
          if (segmented[i] === '/') {
            output.push(segmented.substr(segmentIndex, i - segmentIndex + 1));
            segmentIndex = undefined;
          }
          continue;
        }

        // new segment - check if it is relative
        if (segmented[i] === '.') {
          // ../ segment
          if (
            segmented[i + 1] === '.' &&
            (segmented[i + 2] === '/' || i === segmented.length - 2)
          ) {
            output.pop();
            i += 2;
          }
          // ./ segment
          else if (segmented[i + 1] === '/' || i === segmented.length - 1) {
            i += 1;
          } else {
            // the start of a new segment as below
            segmentIndex = i;
            continue;
          }

          // this is the plain URI backtracking error (../, package:x -> error)
          if (parentIsPlain && output.length === 0)
            throwResolveError(relUrl, parentUrl);

          // trailing . or .. segment
          if (i === segmented.length) output.push('');
          continue;
        }

        // it is the start of a new segment
        segmentIndex = i;
      }
      // finish reading out the last segment
      if (segmentIndex !== undefined)
        output.push(
          segmented.substr(segmentIndex, segmented.length - segmentIndex),
        );

      return (
        parentUrl.substr(0, parentUrl.length - pathname.length) +
        output.join('')
      );
    }

    // sanitizes and verifies (by returning undefined if not a valid URL-like form)
    // Windows filepath compatibility is an added convenience here
    var protocolIndex = relUrl.indexOf(':');
    if (protocolIndex !== -1) {
      if (isNode) {
        // C:\x becomes file:///c:/x (we don't support C|\x)
        if (
          relUrl[1] === ':' &&
          relUrl[2] === '\\' &&
          relUrl[0].match(/[a-z]/i)
        )
          return 'file:///' + relUrl.replace(/\\/g, '/');
      }
      return relUrl;
    }
  }

  /*
 * Register Loader
 *
 * Builds directly on top of loader polyfill to provide:
 * - loader.register support
 * - hookable higher-level resolve
 * - instantiate hook returning a ModuleNamespace or undefined for es module loading
 * - loader error behaviour as in HTML and loader specs, clearing failed modules from registration cache synchronously
 * - build tracing support by providing a .trace=true and .loads object format
 */

  var REGISTER_INTERNAL = createSymbol('register-internal');

  function RegisterLoader() {
    Loader.call(this);

    this[REGISTER_INTERNAL] = {
      // last anonymous System.register call
      lastRegister: undefined,
      // in-flight es module load records
      records: {},
    };

    // tracing
    this.trace = false;
  }

  RegisterLoader.prototype = Object.create(Loader.prototype);
  RegisterLoader.prototype.constructor = RegisterLoader;

  var INSTANTIATE = (RegisterLoader.instantiate = createSymbol('instantiate'));

  // default normalize is the WhatWG style normalizer
  RegisterLoader.prototype[
    (RegisterLoader.resolve = Loader.resolve)
  ] = function(key, parentKey) {
    return resolveIfNotPlain(key, parentKey || baseURI);
  };

  RegisterLoader.prototype[INSTANTIATE] = function(key, processAnonRegister) {};

  // once evaluated, the linkRecord is set to undefined leaving just the other load record properties
  // this allows tracking new binding listeners for es modules through importerSetters
  // for dynamic modules, the load record is removed entirely.
  function createLoadRecord(state, key, registration) {
    return (state.records[key] = {
      key: key,

      // defined System.register cache
      registration: registration,

      // module namespace object
      module: undefined,

      // es-only
      // this sticks around so new module loads can listen to binding changes
      // for already-loaded modules by adding themselves to their importerSetters
      importerSetters: undefined,

      // in-flight linking record
      linkRecord: {
        // promise for instantiated
        instantiatePromise: undefined,
        dependencies: undefined,
        execute: undefined,
        executingRequire: false,

        // underlying module object bindings
        moduleObj: undefined,

        // es only, also indicates if es or not
        setters: undefined,

        // promise for instantiated dependencies (dependencyInstantiations populated)
        depsInstantiatePromise: undefined,
        // will be the array of dependency load record or a module namespace
        dependencyInstantiations: undefined,

        // indicates if the load and all its dependencies are instantiated and linked
        // but not yet executed
        // mostly just a performance shortpath to avoid rechecking the promises above
        linked: false,

        error: undefined,
        // NB optimization and way of ensuring module objects in setters
        // indicates setters which should run pre-execution of that dependency
        // setters is then just for completely executed module objects
        // alternatively we just pass the partially filled module objects as
        // arguments into the execute function
        // hoisted: undefined
      },
    });
  }

  RegisterLoader.prototype[Loader.resolveInstantiate] = function(
    key,
    parentKey,
  ) {
    var loader = this;
    var state = this[REGISTER_INTERNAL];
    var registry = loader.registry[loader.registry._registry];

    return resolveInstantiate(loader, key, parentKey, registry, state).then(
      function(instantiated) {
        if (instantiated instanceof ModuleNamespace) return instantiated;

        // if already beaten to linked, return
        if (instantiated.module) return instantiated.module;

        // resolveInstantiate always returns a load record with a link record and no module value
        if (instantiated.linkRecord.linked)
          return ensureEvaluate(
            loader,
            instantiated,
            instantiated.linkRecord,
            registry,
            state,
            undefined,
          );

        return instantiateDeps(
          loader,
          instantiated,
          instantiated.linkRecord,
          registry,
          state,
          [instantiated],
        )
          .then(function() {
            return ensureEvaluate(
              loader,
              instantiated,
              instantiated.linkRecord,
              registry,
              state,
              undefined,
            );
          })
          .catch(function(err) {
            clearLoadErrors(loader, instantiated);
            throw err;
          });
      },
    );
  };

  function resolveInstantiate(loader, key, parentKey, registry, state) {
    // normalization shortpath for already-normalized key
    // could add a plain name filter, but doesn't yet seem necessary for perf
    var module = registry[key];
    if (module) return Promise.resolve(module);

    var load = state.records[key];

    // already linked but not in main registry is ignored
    if (load && !load.module)
      return instantiate(loader, load, load.linkRecord, registry, state);

    return loader.resolve(key, parentKey).then(function(resolvedKey) {
      // main loader registry always takes preference
      module = registry[resolvedKey];
      if (module) return module;

      load = state.records[resolvedKey];

      // already has a module value but not already in the registry (load.module)
      // means it was removed by registry.delete, so we should
      // disgard the current load record creating a new one over it
      // but keep any existing registration
      if (!load || load.module)
        load = createLoadRecord(state, resolvedKey, load && load.registration);

      var link = load.linkRecord;
      if (!link) return load;

      return instantiate(loader, load, link, registry, state);
    });
  }

  function createProcessAnonRegister(loader, load, state) {
    return function() {
      var lastRegister = state.lastRegister;

      if (!lastRegister) return !!load.registration;

      state.lastRegister = undefined;
      load.registration = lastRegister;

      return true;
    };
  }

  function instantiate(loader, load, link, registry, state) {
    return (
      link.instantiatePromise ||
      (link.instantiatePromise =
        // if there is already an existing registration, skip running instantiate
        (load.registration
          ? Promise.resolve()
          : Promise.resolve().then(function() {
              state.lastRegister = undefined;
              return loader[INSTANTIATE](
                load.key,
                loader[INSTANTIATE].length > 1 &&
                  createProcessAnonRegister(loader, load, state),
              );
            })
        )
          .then(function(instantiation) {
            // direct module return from instantiate -> we're done
            if (instantiation !== undefined) {
              if (!(instantiation instanceof ModuleNamespace))
                throw new TypeError(
                  'Instantiate did not return a valid Module object.',
                );

              delete state.records[load.key];
              if (loader.trace) traceLoad(loader, load, link);
              return (registry[load.key] = instantiation);
            }

            // run the cached loader.register declaration if there is one
            var registration = load.registration;
            // clear to allow new registrations for future loads (combined with registry delete)
            load.registration = undefined;
            if (!registration)
              throw new TypeError(
                'Module instantiation did not call an anonymous or correctly named System.register.',
              );

            link.dependencies = registration[0];

            load.importerSetters = [];

            link.moduleObj = {};

            // process System.registerDynamic declaration
            if (registration[2]) {
              link.moduleObj.default = {};
              link.moduleObj.__useDefault = true;
              link.executingRequire = registration[1];
              link.execute = registration[2];
            }

            // process System.register declaration
            else {
              registerDeclarative(loader, load, link, registration[1]);
            }

            // shortpath to instantiateDeps
            if (!link.dependencies.length) {
              link.linked = true;
              if (loader.trace) traceLoad(loader, load, link);
            }

            return load;
          })
          .catch(function(err) {
            throw (link.error = LoaderError__Check_error_message_for_loader_stack(
              err,
              'Instantiating ' + load.key,
            ));
          }))
    );
  }

  // like resolveInstantiate, but returning load records for linking
  function resolveInstantiateDep(
    loader,
    key,
    parentKey,
    registry,
    state,
    traceDepMap,
  ) {
    // normalization shortpaths for already-normalized key
    // DISABLED to prioritise consistent resolver calls
    // could add a plain name filter, but doesn't yet seem necessary for perf
    /* var load = state.records[key];
  var module = registry[key];

  if (module) {
    if (traceDepMap)
      traceDepMap[key] = key;

    // registry authority check in case module was deleted or replaced in main registry
    if (load && load.module && load.module === module)
      return load;
    else
      return module;
  }

  // already linked but not in main registry is ignored
  if (load && !load.module) {
    if (traceDepMap)
      traceDepMap[key] = key;
    return instantiate(loader, load, load.linkRecord, registry, state);
  } */
    return loader.resolve(key, parentKey).then(function(resolvedKey) {
      if (traceDepMap) traceDepMap[key] = key;

      // normalization shortpaths for already-normalized key
      var load = state.records[resolvedKey];
      var module = registry[resolvedKey];

      // main loader registry always takes preference
      if (module && (!load || (load.module && module !== load.module)))
        return module;

      // already has a module value but not already in the registry (load.module)
      // means it was removed by registry.delete, so we should
      // disgard the current load record creating a new one over it
      // but keep any existing registration
      if (!load || (!module && load.module))
        load = createLoadRecord(state, resolvedKey, load && load.registration);

      var link = load.linkRecord;
      if (!link) return load;

      return instantiate(loader, load, link, registry, state);
    });
  }

  function traceLoad(loader, load, link) {
    loader.loads = loader.loads || {};
    loader.loads[load.key] = {
      key: load.key,
      deps: link.dependencies,
      depMap: link.depMap || {},
    };
  }

  /*
 * Convert a CJS module.exports into a valid object for new Module:
 *
 *   new Module(getEsModule(module.exports))
 *
 * Sets the default value to the module, while also reading off named exports carefully.
 */
  function registerDeclarative(loader, load, link, declare) {
    var moduleObj = link.moduleObj;
    var importerSetters = load.importerSetters;

    var locked = false;

    // closure especially not based on link to allow link record disposal
    var declared = declare.call(
      envGlobal,
      function(name, value) {
        // export setter propogation with locking to avoid cycles
        if (locked) return;

        if (typeof name === 'object') {
          for (var p in name) if (p !== '__useDefault') moduleObj[p] = name[p];
        } else {
          moduleObj[name] = value;
        }

        locked = true;
        for (var i = 0; i < importerSetters.length; i++)
          importerSetters[i](moduleObj);
        locked = false;

        return value;
      },
      new ContextualLoader(loader, load.key),
    );

    link.setters = declared.setters;
    link.execute = declared.execute;
    if (declared.exports) link.moduleObj = moduleObj = declared.exports;
  }

  function instantiateDeps(loader, load, link, registry, state, seen) {
    return (
      link.depsInstantiatePromise ||
      (link.depsInstantiatePromise = Promise.resolve()
        .then(function() {
          var depsInstantiatePromises = Array(link.dependencies.length);

          for (var i = 0; i < link.dependencies.length; i++)
            depsInstantiatePromises[i] = resolveInstantiateDep(
              loader,
              link.dependencies[i],
              load.key,
              registry,
              state,
              loader.trace && (link.depMap = {}),
            );

          return Promise.all(depsInstantiatePromises);
        })
        .then(function(dependencyInstantiations) {
          link.dependencyInstantiations = dependencyInstantiations;

          // run setters to set up bindings to instantiated dependencies
          if (link.setters) {
            for (var i = 0; i < dependencyInstantiations.length; i++) {
              var setter = link.setters[i];
              if (setter) {
                var instantiation = dependencyInstantiations[i];

                if (instantiation instanceof ModuleNamespace) {
                  setter(instantiation);
                } else {
                  setter(
                    instantiation.module || instantiation.linkRecord.moduleObj,
                  );
                  // this applies to both es and dynamic registrations
                  if (instantiation.importerSetters)
                    instantiation.importerSetters.push(setter);
                }
              }
            }
          }
        }))
    )
      .then(function() {
        // now deeply instantiateDeps on each dependencyInstantiation that is a load record
        var deepDepsInstantiatePromises = [];

        for (var i = 0; i < link.dependencies.length; i++) {
          var depLoad = link.dependencyInstantiations[i];
          var depLink = depLoad.linkRecord;

          if (!depLink || depLink.linked) continue;

          if (seen.indexOf(depLoad) !== -1) continue;
          seen.push(depLoad);

          deepDepsInstantiatePromises.push(
            instantiateDeps(
              loader,
              depLoad,
              depLoad.linkRecord,
              registry,
              state,
              seen,
            ),
          );
        }

        return Promise.all(deepDepsInstantiatePromises);
      })
      .then(function() {
        // as soon as all dependencies instantiated, we are ready for evaluation so can add to the registry
        // this can run multiple times, but so what
        link.linked = true;
        if (loader.trace) traceLoad(loader, load, link);

        return load;
      })
      .catch(function(err) {
        err = LoaderError__Check_error_message_for_loader_stack(
          err,
          'Loading ' + load.key,
        );

        // throw up the instantiateDeps stack
        // loads are then synchonously cleared at the top-level through the clearLoadErrors helper below
        // this then ensures avoiding partially unloaded tree states
        link.error = link.error || err;

        throw err;
      });
  }

  // clears an errored load and all its errored dependencies from the loads registry
  function clearLoadErrors(loader, load) {
    var state = loader[REGISTER_INTERNAL];

    // clear from loads
    if (state.records[load.key] === load) delete state.records[load.key];

    var link = load.linkRecord;

    if (!link) return;

    if (link.dependencyInstantiations)
      link.dependencyInstantiations.forEach(function(depLoad, index) {
        if (!depLoad || depLoad instanceof ModuleNamespace) return;

        if (depLoad.linkRecord) {
          if (depLoad.linkRecord.error) {
            // provides a circular reference check
            if (state.records[depLoad.key] === depLoad)
              clearLoadErrors(loader, depLoad);
          }

          // unregister setters for es dependency load records that will remain
          if (link.setters && depLoad.importerSetters) {
            var setterIndex = depLoad.importerSetters.indexOf(
              link.setters[index],
            );
            depLoad.importerSetters.splice(setterIndex, 1);
          }
        }
      });
  }

  /*
 * System.register
 */
  RegisterLoader.prototype.register = function(key, deps, declare) {
    var state = this[REGISTER_INTERNAL];

    // anonymous modules get stored as lastAnon
    if (declare === undefined) {
      state.lastRegister = [key, deps, undefined];
    }

    // everything else registers into the register cache
    else {
      var load = state.records[key] || createLoadRecord(state, key, undefined);
      load.registration = [deps, declare, undefined];
    }
  };

  /*
 * System.registerDyanmic
 */
  RegisterLoader.prototype.registerDynamic = function(
    key,
    deps,
    executingRequire,
    execute,
  ) {
    var state = this[REGISTER_INTERNAL];

    // anonymous modules get stored as lastAnon
    if (typeof key !== 'string') {
      state.lastRegister = [key, deps, executingRequire];
    }

    // everything else registers into the register cache
    else {
      var load = state.records[key] || createLoadRecord(state, key, undefined);
      load.registration = [deps, executingRequire, execute];
    }
  };

  // ContextualLoader class
  // backwards-compatible with previous System.register context argument by exposing .id
  function ContextualLoader(loader, key) {
    this.loader = loader;
    this.key = this.id = key;
  }
  ContextualLoader.prototype.constructor = function() {
    throw new TypeError(
      'Cannot subclass the contextual loader only Reflect.Loader.',
    );
  };
  ContextualLoader.prototype.import = function(key) {
    return this.loader.import(key, this.key);
  };
  ContextualLoader.prototype.resolve = function(key) {
    return this.loader.resolve(key, this.key);
  };
  ContextualLoader.prototype.load = function(key) {
    return this.loader.load(key, this.key);
  };

  // this is the execution function bound to the Module namespace record
  function ensureEvaluate(loader, load, link, registry, state, seen) {
    if (load.module) return load.module;

    if (link.error) throw link.error;

    if (seen && seen.indexOf(load) !== -1) return load.linkRecord.moduleObj;

    // for ES loads we always run ensureEvaluate on top-level, so empty seen is passed regardless
    // for dynamic loads, we pass seen if also dynamic
    var err = doEvaluate(
      loader,
      load,
      link,
      registry,
      state,
      link.setters ? [] : seen || [],
    );
    if (err) {
      clearLoadErrors(loader, load);
      throw err;
    }

    return load.module;
  }

  function makeDynamicRequire(
    loader,
    key,
    dependencies,
    dependencyInstantiations,
    registry,
    state,
    seen,
  ) {
    // we can only require from already-known dependencies
    return function(name) {
      for (var i = 0; i < dependencies.length; i++) {
        if (dependencies[i] === name) {
          var depLoad = dependencyInstantiations[i];
          var module;

          if (depLoad instanceof ModuleNamespace) module = depLoad;
          else
            module = ensureEvaluate(
              loader,
              depLoad,
              depLoad.linkRecord,
              registry,
              state,
              seen,
            );

          return module.__useDefault ? module.default : module;
        }
      }
      throw new Error(
        'Module ' +
          name +
          ' not declared as a System.registerDynamic dependency of ' +
          key,
      );
    };
  }

  // ensures the given es load is evaluated
  // returns the error if any
  function doEvaluate(loader, load, link, registry, state, seen) {
    seen.push(load);

    var err;

    // es modules evaluate dependencies first
    // non es modules explicitly call moduleEvaluate through require
    if (link.setters) {
      var depLoad, depLink;
      for (var i = 0; i < link.dependencies.length; i++) {
        depLoad = link.dependencyInstantiations[i];

        if (depLoad instanceof ModuleNamespace) continue;

        // custom Module returned from instantiate
        depLink = depLoad.linkRecord;
        if (depLink && seen.indexOf(depLoad) === -1) {
          if (depLink.error) err = depLink.error;
          // dynamic / declarative boundaries clear the "seen" list
          // we just let cross format circular throw as would happen in real implementations
          else
            err = doEvaluate(
              loader,
              depLoad,
              depLink,
              registry,
              state,
              depLink.setters ? seen : [],
            );
        }

        if (err)
          return (link.error = LoaderError__Check_error_message_for_loader_stack(
            err,
            'Evaluating ' + load.key,
          ));
      }
    }

    // link.execute won't exist for Module returns from instantiate on top-level load
    if (link.execute) {
      // ES System.register execute
      // "this" is null in ES
      if (link.setters) {
        err = declarativeExecute(link.execute);
      }
      // System.registerDynamic execute
      // "this" is "exports" in CJS
      else {
        var module = { id: load.key };
        var moduleObj = link.moduleObj;
        Object.defineProperty(module, 'exports', {
          configurable: true,
          set: function(exports) {
            moduleObj.default = exports;
          },
          get: function() {
            return moduleObj.default;
          },
        });

        var require = makeDynamicRequire(
          loader,
          load.key,
          link.dependencies,
          link.dependencyInstantiations,
          registry,
          state,
          seen,
        );

        // evaluate deps first
        if (!link.executingRequire)
          for (var i = 0; i < link.dependencies.length; i++)
            require(link.dependencies[i]);

        err = dynamicExecute(link.execute, require, moduleObj.default, module);

        // pick up defineProperty calls to module.exports when we can
        if (module.exports !== moduleObj.default)
          moduleObj.default = module.exports;

        // __esModule flag extension support
        if (moduleObj.default && moduleObj.default.__esModule)
          for (var p in moduleObj.default)
            if (
              Object.hasOwnProperty.call(moduleObj.default, p) &&
              p !== 'default'
            )
              moduleObj[p] = moduleObj.default[p];
      }
    }

    if (err)
      return (link.error = LoaderError__Check_error_message_for_loader_stack(
        err,
        'Evaluating ' + load.key,
      ));

    registry[load.key] = load.module = new ModuleNamespace(link.moduleObj);

    // if not an esm module, run importer setters and clear them
    // this allows dynamic modules to update themselves into es modules
    // as soon as execution has completed
    if (!link.setters) {
      if (load.importerSetters)
        for (var i = 0; i < load.importerSetters.length; i++)
          load.importerSetters[i](load.module);
      load.importerSetters = undefined;
    }

    // dispose link record
    load.linkRecord = undefined;
  }

  // {} is the closest we can get to call(undefined)
  var nullContext = {};
  if (Object.freeze) Object.freeze(nullContext);

  function declarativeExecute(execute) {
    try {
      execute.call(nullContext);
    } catch (e) {
      return e;
    }
  }

  function dynamicExecute(execute, require, exports, module) {
    try {
      var output = execute.call(envGlobal, require, exports, module);
      if (output !== undefined) module.exports = output;
    } catch (e) {
      return e;
    }
  }

  if (
    !window.babel ||
    !window.babelPluginTransformES2015ModulesSystemJS ||
    !window.babelPluginSyntaxDynamicImport
  )
    throw new Error('babel-browser-build.js must be loaded first');

  var loader;

  // <script type="module"> support
  var anonSources = {};
  if (typeof document != 'undefined' && document.getElementsByTagName) {
    function ready() {
      document.removeEventListener('DOMContentLoaded', ready, false);

      var anonCnt = 0;

      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.type == 'module' && !script.loaded) {
          script.loaded = true;
          if (script.src) {
            loader.import(script.src);
          }
          // anonymous modules supported via a custom naming scheme and registry
          else {
            var uri = './<anon' + ++anonCnt + '>';
            if (script.id !== '') {
              uri = './' + script.id;
            }

            var anonName = resolveIfNotPlain(uri, baseURI);
            anonSources[anonName] = script.innerHTML;
            loader.import(anonName);
          }
        }
      }
    }

    // simple DOM ready
    if (document.readyState === 'complete') setTimeout(ready);
    else document.addEventListener('DOMContentLoaded', ready, false);
  }

  function BrowserESModuleLoader(baseKey) {
    if (baseKey)
      this.baseKey =
        resolveIfNotPlain(baseKey, baseURI) ||
        resolveIfNotPlain('./' + baseKey, baseURI);

    RegisterLoader.call(this);

    var loader = this;

    // ensure System.register is available
    envGlobal.System = envGlobal.System || {};
    if (typeof envGlobal.System.register == 'function')
      var prevRegister = envGlobal.System.register;
    envGlobal.System.register = function() {
      loader.register.apply(loader, arguments);
      if (prevRegister) prevRegister.apply(this, arguments);
    };
  }
  BrowserESModuleLoader.prototype = Object.create(RegisterLoader.prototype);

  // normalize is never given a relative name like "./x", that part is already handled
  BrowserESModuleLoader.prototype[RegisterLoader.resolve] = function(
    key,
    parent,
  ) {
    var resolved =
      RegisterLoader.prototype[RegisterLoader.resolve].call(
        this,
        key,
        parent || this.baseKey,
      ) || key;
    if (!resolved)
      throw new RangeError(
        'ES module loader does not resolve plain module names, resolving "' +
          key +
          '" to ' +
          parent,
      );

    return resolved;
  };

  function xhrFetch(url, resolve, reject) {
    var xhr = new XMLHttpRequest();
    function load(source) {
      resolve(xhr.responseText);
    }
    function error() {
      reject(
        new Error(
          'XHR error' +
            (xhr.status
              ? ' (' +
                xhr.status +
                (xhr.statusText ? ' ' + xhr.statusText : '') +
                ')'
              : '') +
            ' loading ' +
            url,
        ),
      );
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        // in Chrome on file:/// URLs, status is 0
        if (xhr.status == 0) {
          if (xhr.responseText) {
            load();
          } else {
            // when responseText is empty, wait for load or error event
            // to inform if it is a 404 or empty file
            xhr.addEventListener('error', error);
            xhr.addEventListener('load', load);
          }
        } else if (xhr.status === 200) {
          load();
        } else {
          error();
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
  }

  // instantiate just needs to run System.register
  // so we fetch the source, convert into the Babel System module format, then evaluate it
  BrowserESModuleLoader.prototype[RegisterLoader.instantiate] = function(
    key,
    processAnonRegister,
  ) {
    var loader = this;

    // load as ES with Babel converting into System.register
    return new Promise(function(resolve, reject) {
      // anonymous module
      if (anonSources[key]) {
        resolve(anonSources[key]);
        anonSources[key] = undefined;
      }
      // otherwise we fetch
      else {
        xhrFetch(key, resolve, reject);
      }
    }).then(function(source) {
      // transform source with Babel
      var output = babel.transform(source, {
        compact: false,
        filename: key + '!transpiled',
        sourceFileName: key,
        moduleIds: false,
        sourceMaps: 'inline',
        babelrc: false,
        plugins: [
          babelPluginSyntaxDynamicImport,
          babelPluginTransformES2015ModulesSystemJS,
        ],
      });

      // evaluate without require, exports and module variables
      // we leave module in for now to allow module.require access
      (0, eval)(output.code + '\n//# sourceURL=' + key + '!transpiled');
      processAnonRegister();
    });
  };

  // create a default loader instance in the browser
  if (isBrowser) loader = new BrowserESModuleLoader();

  return BrowserESModuleLoader;
});
