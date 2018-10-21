'use strict';
const mongoose = require('mongoose');
const MtaEdgesNamesSchema = mongoose.Schema({
	source_id: String,
	target_id: String,
	edge_type: String,
	duration: Number,
	source_name: String,
	target_name: String
});
module.exports = mongoose.model('MtaEdgesNames', MtaEdgesNamesSchema, 'mtaEdgesNames');