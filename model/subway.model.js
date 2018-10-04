'use strict';
const mongoose = require('mongoose');
const SubwaySchema = mongoose.Schema(
	{
		"Division": String,
		"Line": String,
		"Station Name": String,
		"Station Latitude": Number,
		"Station Longitude": Number,
		"Route1": String,
		"Route2": String,
		"Route3": String,
		"Route4": String,
		"Route5": String,
		"Route6": String,
		"Route7": String,
		"Route8": String,
		"Route9": String,
		"Route10": String,
		"Route11": String,
		"Entrance Type": String,
		"Entry": String,
		"Exit Only": String,
		"Vending": String,
		"Staffing": String,
		"Staff Hours": String,
		"ADA": String,
		"ADA Notes": String,
		"Free Crossover": String,
		"North South Street": String,
		"East West Street": String,
		"Corner": String,
		"Entrance Latitude": Number,
		"Entrance Longitude": Number,
		"Station Location": String,
		"Entrance Location": String
	}
);
module.exports = mongoose.model('Subway', SubwaySchema, 'subway');