const mongoose = require('mongoose');
const Subway = require('../model/subway.model');

exports.getTColumns = (req, res) => {
	const colNames = [];
	Subway.schema.eachPath(path => {
		if (path !== '__v') {
			colNames.push({
				title: path,
				field: path.toLowerCase()
			});
		}
	});
	return res.send(colNames);
}

function lowerKeys(obj) {
	let key, keys = Object.keys(obj);
	let n = keys.length;
	let newobj={};
	while (n--) {
			key = keys[n];
			newobj[key.toLowerCase()] = obj[key];
	}
	return newobj;
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
		console.log(`newData: ${JSON.stringify(newData)}`);
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