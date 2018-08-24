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