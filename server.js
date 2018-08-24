'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const showdown = require('showdown');

app.listen(3030, listening);
function listening() {
	console.log('Listening...');
}

app.use(express.static('pages'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(
	cors({
			origin: CLIENT_ORIGIN
	})
);

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Convert README file to HTML
// https://stackoverflow.com/questions/15311978/converting-multiple-files-into-html-from-markdown
const mdFile = new XMLHttpRequest();
mdFile.open("GET", "./README.md", true);
mdFile.onreadystatechange = function(){
 // Makes sure the document exists and is ready to parse.
 if (mdFile.readyState === 4 && mdFile.status === 200)   
 {
    var mdText = mdFile.responseText; 
    var converter = new showdown.Converter();
    var html = converter.makeHtml(mdText);
    //Do whatever you want to do with the HTML text
 }
}

const readme = '/readme';
app.get(readme, (req, res) => {
	const data = require('./README.md');
	const converter = new.showdown.Converter();
	const html = converter.makeHtml(data); 
	res.send(data);
})
/*
const countriesData = `/countries`;
app.get(countriesData, (req, res) => {
	const data = require('./pages/table/countries.csv')
	res.json({data});
});
*/