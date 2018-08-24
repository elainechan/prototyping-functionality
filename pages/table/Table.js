'use strict';
import React from 'react';
const d3 = require('d3');
if (typeof fetch !== 'function') {
	global.fetch = require('node-fetch-polyfill');
}
const csv = require('d3-fetch').csv;

export default () => (
  <div>
    <p>This is the Table page</p>
  </div>
)

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.createTable = this.createTable.bind(this);
	}

	componentDidMount() {
		this.createTable();
	}
	componentDidUpdate() {
		this.createTable();
	}

	createTable() {
		const node = this.node;
		var header = d3.select(node).append('h3').text('Countries of the World');
		d3.select(node).append('.table');
		var table = d3.select('.table');
		var colNames = [];
		var thead = table.append('thead');
		var tbody = table.append('tbody');
	}

	render() {
		return (
		<div className="container">

		</div>
		)
	}
}

/*
d3.csv("./countries.csv").then(
	function (data) {
		function tabulate(data, columns) {
			var table = d3.select(".table"),
				columnNames = ["", "", "", "", "", ""],
				thead = table.append("thead"),
				tbody = table.append("tbody");
	
			// append the header row
			thead.append("tr")
				.selectAll("th")
				.data(columnNames)
				.enter()
				.append("th")
				.text(function (columnNames) { return columnNames; });
	
			// create a row for each object in the data
			var rows = tbody.selectAll("tr")
				.data(data)
				.enter()
				.append("tr")
				.attr("class", "data-point")
	
			// create a cell in each row for each column
			var cells = rows.selectAll("td")
				.data(function (row) {
					return columns.map(function (column) {
						return { column: column, value: row[column] };
					});
				})
				.enter()
				.append("td")
				.attr("style", "font-family: 'Lato'")
					.html(function (d) {
						if ($.isNumeric(d.value)) {//jQuery function checks if number is numeric, if it is formats it with thousands seporator
							return formatMoney(d.value)
						} else {
							return d.value;
						};
					});
	
			return table;
		};

		let arr = [...Array(21).keys()].map(item => item = 'c' + item.toString());
		arr.splice(0, 1);
	
		tabulate(data, arr); //The names of the columns in the CSV file

		// Grey alternate rows
		d3.selectAll(".data-point").style("background", function(d, i) {
			return i % 2 ? "#fff" : "#eee";
		});
	
		function formatMoney(n) {
			return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
		};
	});
	*/