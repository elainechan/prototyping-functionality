'use strict';

// Create column selection menu
function renderColumnSelection() {
	fetch('/cols')
	.then(res => res.json())
	.then(data => {
		let cols = data
		.filter(val => val !== '__v')
		.filter(val => val !== '_id');
		document.body.insertBefore(
			document.createElement('form'), document.querySelector('#tabulator-table')
		);
		let form = document.querySelector('form');
		form.setAttribute('class', 'column-selection');
		let fieldset = document.createElement('fieldset');
		let legend = document.createElement('legend');
		let ltext = document.createTextNode('Choose columns to display');
		legend.appendChild(ltext);
		form.appendChild(fieldset);
		fieldset.appendChild(legend);
		cols.forEach((val, i) => {
			let input = document.createElement('input')
			input.setAttribute('type', 'checkbox')
			input.checked = true;
			input.setAttribute('onclick','handleColumnSelect(this);')
			input.setAttribute('name', 'column');
			input.setAttribute('id', val.replace(/ /i, '-').toLowerCase());
			let label = document.createElement('label');
			let br = document.createElement('br');
			label.setAttribute('for', val.replace(/ /i, '-').toLowerCase())
			let text = document.createTextNode(val);
			label.appendChild(text);
			fieldset.appendChild(input);
			fieldset.appendChild(label);
			fieldset.appendChild(br);
		});
	});
}

function handleColumnSelect(e) {
console.log("Clicked, new value = " + e.checked)
let id = e.getAttribute('id').replace(/-/i, ' ');
	if (e.checked === false) {
		console.log(`deselected column: ${id}`)
		tabulator.hideColumn(id);
		return (id, false)
	} else {
		tabulator.showColumn(id)
		return (id, true)
	}
}
// Construct table
const tabulator = new Tabulator("#tabulator-table", {
	height: 300,
	selectable: true,
	movableColumns: true,
	movableRows: true,
});

function renderTabulator() {
	let table = document.querySelector("#tabulator-table");
	table.style.display = 'block';
	fetch('/tcolumns')
	.then(res => {
		return res.json();
	})
	.then(data => {
		console.log(`setcolumns: ${JSON.stringify(data)}`)
		tabulator.setColumns(data);
		tabulator.setData('/tdata'); //efficient,inflexible
		return;
	});
}

// ag-Grid table
function renderAgGrid() {
	let table = document.querySelector('#ag-grid-table');
	table.style.display = 'block';
	let gridOptions = {};
	// create the grid passing in the div to use together with the columns & data we want to use
	new agGrid.Grid(table, gridOptions);
	
	fetch('/agcolumns')
	.then(res => res.json())
	.then(data => {
		gridOptions.api.setColumnDefs(data);
	});
	
	fetch('/agdata').then(function(response) {
		return response.json();
	}).then(function(data) {
		let newData = data.map((val, i) => {
			delete val._id;
			return val;
		})
		gridOptions.api.setRowData(newData);
	});
}

renderTabulator();
renderColumnSelection();
renderAgGrid();