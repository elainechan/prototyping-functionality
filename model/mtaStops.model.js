'use strict';
const mongoose = require('mongoose');
const MtaStopsSchema = mongoose.Schema({
	'station_id': String,
	'station_name': String,
	'station_lat': Number,
	'station_lon': Number
});
module.exports = mongoose.model('MtaStops', MtaStopsSchema, 'mtaStops')