# Change Log

## Version 1.0.4 *(2016-04-12)*

* Changed temporary 'breach' hack to match author's intentions

  *The API author (Troy Hunt) indicated there is no hard format restrictions on
  a breach name, so the concept of an invalid breach name is not in play here.
  The API will respond with HTTP status 404 (not found) once the fix has been
  applied. This change mimics that behavior as opposed to responding with HTTP
  status 400 (bad request), which was my initial interpretation.*

## Version 1.0.3 *(2016-04-10)*

* Update documentation

## Version 1.0.2 *(2016-04-10)*

* Shield clients from broken
  '[breach](https://haveibeenpwned.com/API/v2#SingleBreach)' endpoint when
  querying for an invalid breach name

  *Currently, the endpoint responds with HTTP status 200 and "page not found"
  HTML in the body if an invalid breach name is queried (e.g. 'adobe.com',
  instead of the proper breach name, 'adobe'). Based on the response codes
  described in the API documentation, I believe it should respond with HTTP
  status 400 (bad request). Prior to this patch, it lead to a confusing one-off
  scenario for clients consuming this module. This change should provide a
  consistent experience by intercepting this specific case and throwing a "bad
  request" error instead of a `SyntaxError` from trying to parse HTML. I
  brought this API behavioral discrepancy to the API author's attention and he
  agreed it was broken and noted that a fix is incoming.*

* Updated tests

## Version 1.0.1 *(2016-04-08)*

* Removed `preferGlobal` option from package.json

## Version 1.0.0 *(2016-04-08)*

* Initial release
