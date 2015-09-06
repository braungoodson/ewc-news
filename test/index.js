var News = require('../index.js');

News.news({
	keywords: 'large hadron collider, half-life, metallica',
	done: function(news) {
		console.log(news);
	}
});