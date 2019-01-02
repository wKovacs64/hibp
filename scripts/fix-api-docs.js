const fs = require('fs');

const filename = 'API.md';
const generatedApiDocs = fs.readFileSync(filename, 'utf8');
const newApiDocs = generatedApiDocs
  // Replace the generated link to the `Breach` object with a more specific
  // anchor name as the generated one collides with the `breach` function
  // because anchor links are case insensitive.
  .replace(/#Breach/g, '#breach--object')
  // Surround all the generated Promise.<Array.<Type>> strings with links to the
  // corresponding typedef object as jsdoc2md seems to have an issue parsing the
  // syntax for a promise that resolves to an array of custom types.
  .replace(
    /(Promise\.&lt;Array\.&lt;([A-Z].*)&gt;&gt;)/g,
    (match, g1, g2) => `<a href="#${g2.toLowerCase()}--object">${g1}</a>`,
  );
fs.writeFileSync(filename, newApiDocs, 'utf8');
