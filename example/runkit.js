const hibp = require('hibp');

hibp
  .breachedAccount('someAccountOrEmail')
  .then((data) => {
    if (data) {
      // Bummer...
      console.log(data);
    } else {
      // Phew! We're clear.
      console.log('Good news — no pwnage found!');
    }
  })
  .catch((err) => {
    // Something went wrong.
    console.log(err.message);
  });
