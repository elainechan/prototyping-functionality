'use strict';
const mongoose = require('mongoose');
const MtaStopsRoutesSchema = mongoose.Schema({
	station_id: String,
	station_name: String,
	station_lat: Number,
	station_lon: Number,
	line_name: String,
	hexcolor: String
});
module.exports = mongoose.model('MtaStopsRoutes', MtaStopsRoutesSchema, 'mtaStopsRoutes');