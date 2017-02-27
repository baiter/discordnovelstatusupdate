var statusUpdate = require('./statusUpdate.js');

var displayDS = function(err, data) {
  if (err) throw err; // Check for the error and throw if it exists.
  console.log(data); // Otherwise proceed as usual.
};

var myResult = statusUpdate.dsStatusUpdate(displayDS);
