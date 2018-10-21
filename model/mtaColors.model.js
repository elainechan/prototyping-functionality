'use strict';
const mongoose = require('mongoose');
const MtaColorsSchema = mongoose.Schema({
	line_name: String,
	hexcolor: String
});
module.exports = mongoose.model('MtaColors', MtaColorsSchema, 'mtaColorMap');