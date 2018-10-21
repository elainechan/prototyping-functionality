const mongoose = require('mongoose');
const Subway = require('../model/subway.model');
const MtaStops = require('../model/mtaStops.model');
const MtaEdges = require('../model/mtaEdges.model');
const MtaRoutes = require('../model/mtaRoutes.model');
const MtaStopsRoutes = require('../model/mtaStopsRoutes.model');
const MtaColors = require('../model/mtaColors.model');
const MtaEdgesNames = require('../model/mtaEdgesNames.model');
const { lowerKeysAndReplaceSpaceWithDash } = require('./utils');

exports.getCircuitData = (req, res) => {
	Subway.find()
	.lean()
	.exec((err, data) => {
		if(err) {
			console.log(err);
		}
		let nodes = [];
		let newData = data.map((val, i) => {
			val.id = i + 1;
			val = lowerKeysAndReplaceSpaceWithDash(val);
			nodes.push({
				'id': val.id,
				'line': val['line'],
				'station-name': val['station-name'],
				'station-latitude': val['station-latitude'],
				'station-longitude': val['station-longitude']
			})
		});
		return res.json(nodes);
	})
}

exports.getMtaStops = (req, res) => {
	MtaStops.find()
		.lean()
		.exec((err, data) => {
			if(err) { console.log(err) };
			return res.json(data);
		});
}

exports.getMtaEdges = (req, res) => {
	MtaEdges.find({edge_type: 'route'})
		.lean()
		.exec((err, data) => {
			if(err) { console.log(err) };
			return res.json(data);
		});
}

exports.getMtaRoutes = (req, res) => {
	MtaRoutes.find()
	.lean()
	.exec((err, data) => {
		if(err) { console.log(err) };
		return res.json(data);
	});
}

exports.getMtaStopsRoutes = (req, res) => {
	MtaStopsRoutes.find()
	.lean()
	.exec((err, data) => {
		if(err) {console.log(err)};
		return res.json(data);
	})
}

exports.getColors = (req,res) => {
	MtaColors.find()
	.lean()
	.exec((err, data) => {
		if(err) {console.log(err)};
		return res.json(data);
	})
}

exports.getEdgesNames = (req, res) => {
	MtaEdgesNames.find()
	.lean()
	.exec((err, data) => {
		if(err) {console.log(err)};
		return res.json(data); 
	})
}