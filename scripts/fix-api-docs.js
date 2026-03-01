import fs from "node:fs";

const filename = "API.md";
const generatedApiDocs = fs.readFileSync(filename, "utf8");
const newApiDocs = generatedApiDocs
  // Replace the generated links to certain objects with more specific anchor
  // names as the generated ones collide with functions that share a name with
  // the objects (as anchor links are case insensitive).
  .replace(/#Breach/g, "#breach--object")
  .replace(/#SubscriptionStatus/g, "#subscriptionstatus--object")
  // Surround all the generated Promise.<Array.<Type>> strings with links to the
  // corresponding typedef object as jsdoc2md seems to have an issue parsing the
  // syntax for a promise that resolves to an array of custom types.
  .replace(
    /(Promise\.&lt;Array\.&lt;([A-Z].*)&gt;&gt;)/g,
    (_match, g1, g2) => `<a href="#${g2.toLowerCase()}--object">${g1}</a>`,
  );

fs.writeFileSync(filename, newApiDocs, "utf8");
