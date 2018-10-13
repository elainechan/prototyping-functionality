const mongoose = require('mongoose');
const Subway = require('../model/subway.model');
const { lowerKeys } = require('./utils');

exports.getCols = (req, res) => {
	const cols = [];
	Subway.schema.eachPath(path => {
		cols.push(path);
	});
	return res.send(cols);
}

exports.getTColumns = (req, res) => {
	const colNames = [];
	Subway.schema.eachPath((path, type) => {
		if (path !== '__v' || path !== '_id') {
			colNames.push({
				title: path,
				field: path.toLowerCase()
			});
		}
	});
	return res.send(colNames);
}

exports.getTData = (req, res) => {
	Subway.find()
	.lean()
	.exec((err, data) => {
		if(err) {
			console.log(err);
		}
		let newData = data.map((val, i) => {
			delete val._id;
			delete val.__V;
			val.id = i + 1;
			return lowerKeys(val);
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
				field: path.toLowerCase()
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
		let newData = data.map(val => lowerKeys(val));
		return res.json(newData);
	})
}