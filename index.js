var Q = require('q');
var Request = require('request');

var News = {
  news: function (queries) {
    var requests = [];
    var keyword;
    for (var q in queries) {
      keyword = escape(queries[q].keyword);
      for (var i = 0; i < queries[q].pages; i++) {
        requests.push(request(resource(keyword,(i*4)+queries[q].start)));
      }
    }
    return Q.all(requests);
  }
};

function escape(string) {
  var escaped = string.replace(/ /g, '%20');
  return escaped;
}

function resource(query, page) {
  var protocol = 'http://';
  var hostname = 'ajax.googleapis.com';
  var path = '/ajax/services/search/news?v=1.0&q=';
  var start = '&start='+page;
  var resource = protocol + hostname + path + query + start;
  return resource;
}

function request(resource) {
  var d = Q.defer();
  Request(resource, function (error, response, body) {
    if (error) {
      d.reject(error);
    } else {
      d.resolve(body);
    }
  });
  return d.promise;
}

module.exports = News;