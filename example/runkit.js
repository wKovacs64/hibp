const hibp = require('hibp');

try {
  const data = await hibp.breach('Adobe');

  if (data) {
    // Breach data found
    console.log(data);
  } else {
    console.log('No breach data found by that name.');
  }
} catch (err) {
  // Something went wrong.
  console.log(err.message);
}
