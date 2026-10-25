import fs from "node:fs";

const filename = "API.md";
const generatedApiDocs = fs.readFileSync(filename, "utf8");
const newApiDocs = generatedApiDocs
  // Use specific anchor names for data models. Some generated names collide
  // with functions that share a name (anchor links are case insensitive).
  .replace(/#Breach/g, "#breach--object")
  .replace(/#DataClassDescription/g, "#dataclassdescription--object")
  .replace(/#SubscriptionStatus/g, "#subscriptionstatus--object")
  // Surround all the generated Promise.<Array.<Type>> strings with links to the
  // corresponding typedef object as jsdoc2md seems to have an issue parsing the
  // syntax for a promise that resolves to an array of custom types.
  .replace(
    /(Promise\.&lt;Array\.&lt;([A-Z].*)&gt;&gt;)/g,
    (_match, g1, g2) => `<a href="#${g2.toLowerCase()}--object">${g1}</a>`,
  );

fs.writeFileSync(filename, newApiDocs, "utf8");
