var News = require('../index.js');

News.news([{
	keyword: 'ceres',
	pages: 3,
	start: 0
}, {
	keyword: 'pluto',
	pages: 3,
	start: 0
}]).then(function(responses){
	var news = [];
	for (var r in responses) {
		var response = JSON.parse(responses[r]);
		var results = response.responseData.results;
		for (var r in results) {
			console.log(results[r].title);
			news.push(results[r]);
		}
	}
}).fail(function(error){
	console.log(error);
});