const mongoose = require('mongoose');
const Subway = require('../model/subway.model');
const MtaStops = require('../model/mtaStops.model');
const { lowerKeysAndReplaceSpaceWithDash } = require('./utils');

exports.getCols = (req, res) => {
	const cols = [];
	Subway.schema.eachPath(path => {
		cols.push(path);
	});
	return res.send(cols);
}

exports.getSchemaTypes = (req, res) => {
	const paths = []; 
	const types = [];
	Subway.schema.eachPath((err, path, type) => {
		if(err) console.log(err);
			paths.push(path);
			types.push(type);
			return res.send(type);
	});
}

exports.getTColumns = (req, res) => {
	const colNames = [];
	Subway.schema.eachPath((path, type) => {
		if (path !== '__v' || path !== '_id') {
			colNames.push({
				title: path,
				field: path.toLowerCase().replace(/ /i, '-')
			});
		}
	});
	return res.send(colNames);
}

exports.getTData = (req, res) => {
	MtaStops.find()
	.lean()
	.exec((err, data) => {
		if(err) {
			console.log(err);
		}
		let newData = data.map((val, i) => {
			delete val._id;
			val.id = i + 1;
			return val;
		});
		return res.json(newData);
	})
}

exports.getAgColumns = (req, res) => {
	const colNames = [];
	Subway.schema.eachPath(path => {
		if (path !== '__v' && path !== '_id') {
			colNames.push({
				headerName: path,
				field: path.toLowerCase().replace(/ /i, '-')
			});
		}
	});
	return res.send(colNames);
}

exports.getAgData = (req, res) => {
	Subway.find()
	.lean()
	.exec((err, data) => {
		if (err) {
			console.log(err);
		}
		let newData = data.map(val => lowerKeysAndReplaceSpaceWithDash(val));
		return res.json(newData);
	})
}