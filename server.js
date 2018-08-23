'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(3030, listening);
function listening() {
	console.log('Listening...');
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*
const countriesData = `/countries`;
app.get(countriesData, (req, res) => {
	const data = require('./public/table/countries.csv')
	res.json({data});
});
*/