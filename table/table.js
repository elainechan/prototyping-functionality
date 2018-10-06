const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tabulator = require('tabulator-tables');
const Subway = require('../model/subway.model');

exports.getColumns = (req, res) => {
	const colNames = [];
	Subway.schema.eachPath(path => {
		colNames.push({
			title: path,
			field: path.toLowerCase()
		})
	});
	return res.send(colNames);
}

exports.getData = (req, res) => {
	
}