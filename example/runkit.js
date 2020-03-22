const hibp = require('hibp');

hibp
  .breach('Adobe')
  .then((data) => {
    if (data) {
      // Breach data found
      console.log(data);
    } else {
      console.log('No breach data found by that name.');
    }
  })
  .catch((err) => {
    // Something went wrong.
    console.log(err.message);
  });
