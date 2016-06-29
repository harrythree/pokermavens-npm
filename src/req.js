var request = require('request');
var Promise = require('bluebird');

module.exports = function(form, config) {
  form.Password = config.password;
  form.JSON = 'yes';

  return new Promise(function(resolve, reject) {
    request.post({
      url: config.url,
      json: true,
      form: form
    }, function(err, res, body) {
      var error = createError(err, body);

      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

function createError(err, body) {
  var error = null;
  if (err) {
    error = err;
  }

  if (body.Result === 'Error') {
    error = body.Error;
  }
  return error;
}
