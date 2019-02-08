var request = require('request');

module.exports.post = (url, body) => {
  return new Promise(function (resolve, reject) {
    request.post({ url: url, json: body }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports.put = (url, body) => {
  return new Promise(function (resolve, reject) {
    request.put({ url: url, json: body }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports.get = (url) => {
  return new Promise(function (resolve, reject) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports.delete = (url) => {
  return new Promise(function (resolve, reject) {
    request({ method: 'DELETE', url: url }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}