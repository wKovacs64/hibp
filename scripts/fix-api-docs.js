import fs from "node:fs";

const filename = "API.md";
const generatedApiDocs = fs.readFileSync(filename, "utf8");

const typedefAnchorsCollidingCaseInsensitivelyWithFunctions = [
  { pattern: /#Breach\b/g, anchor: "#breach--object" },
  {
    pattern: /#DataClassDescription\b/g,
    anchor: "#dataclassdescription--object",
  },
  { pattern: /#SubscriptionStatus/g, anchor: "#subscriptionstatus--object" },
];

/** @param {string} docs */
function linkPromisedTypedefArraysJsdoc2mdLeavesUnlinked(docs) {
  return docs.replace(
    /(Promise\.&lt;Array\.&lt;([A-Z].*)&gt;&gt;)/g,
    (_match, /** @type {string} */ g1, /** @type {string} */ g2) =>
      `<a href="#${g2.toLowerCase()}--object">${g1}</a>`,
  );
}

const newApiDocs = linkPromisedTypedefArraysJsdoc2mdLeavesUnlinked(
  typedefAnchorsCollidingCaseInsensitivelyWithFunctions.reduce(
    (docs, { pattern, anchor }) => docs.replace(pattern, anchor),
    generatedApiDocs,
  ),
);

fs.writeFileSync(filename, newApiDocs, "utf8");
