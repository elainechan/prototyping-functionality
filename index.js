'use strict';

d3.text('./README.md').then(data => {
	var converter = new showdown.Converter();
	var mdHTML = converter.makeHtml(data);
	console.log(mdHTML);
	console.log(typeof mdHTML); // string
	$('body')
		.prepend(mdHTML.toString()); // prepend html to top of body
});

var header = document.querySelector('header');
var link = document.createElement('a')
var textNode = 'Table'
header.appendChild(link)
	.setAttribute('href', './pages/table')
	.appendChild(textNode);