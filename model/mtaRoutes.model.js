'use strict';
const mongoose = require('mongoose');
const MtaRoutesSchema = mongoose.Schema({
	'station_id': String,
	'line_name': String,
	'hexcolor': String
});
module.exports = mongoose.model('MtaRoutes', MtaRoutesSchema, 'mtaRoutes');