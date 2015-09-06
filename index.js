var News = {
  news: function news(config) {
    //console.log('executing news for ', config);
    var keywords = config.keywords;
    var done = config.done;
    var queries = keywords.split(', ');
    //console.log('using ' + queries.length + ' keywords');
    var news = [];

    for (var i = queries.length - 1; i >= 0; i--) {
      //console.log(i + ' calling request with ' + queries[i]);
      forEachRequest(i, queries[i], done);
    }

    function forEachRequest(i, q, done) {
      request(q, function(response){
        //console.log('begin response processing');
        var object = JSON.parse(response);
        var results = object.responseData.results;
        for (var r in results) {
          //console.log('got new result');
          news.push(results[r]);
        }
        //console.log(i);
        if (!i) {
          //console.log('done');
          done(news);
        }
      });
    }

    function request(query, callback) {

      var http = require('http');

      //console.log('making request for ' + query)

      var options = {
        hostname: 'ajax.googleapis.com',
        port: 80,
        path: '/ajax/services/search/news?v=1.0&q='+escape(query),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'http://gdsn.io'
        }
      };

      //console.log('set options');

      var req;
      //console.log('calling http.request');
      req = http.request(options, requestHandler);
      //console.log('binding error handler');
      req.on('error', errorHandler);
      //console.log('ending request');
      req.end();

      function requestHandler(res) {
        //console.log('begining requestHandler');
        res.setEncoding('utf8');
        var chunks = '';
        res.on('data', function (chunk) {
          //console.log('got data');
          chunks += chunk;
        });
        res.on('end', function () {
          //console.log('end data');
          callback(chunks);
        });
      }

      function errorHandler(e) {
        //console.log(e.message);
        throw new Error(e.message);
      }

      function escape(q) {
        //console.log('escaping ' + q);
        return q.replace(' ', '%20');
      }
    }
  }
};

module.exports = News;