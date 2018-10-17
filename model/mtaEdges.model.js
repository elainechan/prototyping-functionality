'use strict';
const mongoose = require('mongoose');
const MtaEdgesSchema = mongoose.Schema({
	'source_id': String,
	'target_id': String,
	'edge_type': String,
	'duration': Number
});
module.exports = mongoose.model('MtaEdges', MtaEdgesSchema, 'mtaEdges');