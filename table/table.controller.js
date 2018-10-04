const mongoose = require('mongoose');
const Tabulator = require('tabulator-tables');
const Subway = require('../model/subway.model');

const table = new Tabulator('#subway-table', {
	columns: colNames
});

const colNames = [];
Subway.schema.eachPath(path => {
	colNames.push({
		title: path,
		field: path.toLowerCase(),
		sorter: this.pathType.toLowerCase(),
		editor: "input"
	})
})