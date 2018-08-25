'use strict';

d3.text('./README.md').then(data => {
	var converter = new showdown.Converter();
	var mdHTML = converter.makeHtml(data);
	console.log(mdHTML);
	console.log(typeof mdHTML); // string
	$('body')
		.prepend(mdHTML.toString()); // prepend html to top of body
});