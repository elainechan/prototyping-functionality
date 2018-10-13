'use strict';

function handleTabulatorButton() {
	console.log('handleTabulatorButton');
	let tabulator = document.getElementById("tabulator-table");
	if (tabulator.style.visibility === 'visible') {
		tabulator.style.visibility = 'hidden';
	} else {
		tabulator.style.visibility = 'visible';
	}
}

function handleAgGridButton() {
	console.log('handleAgGridButton');
	let ag = document.getElementById('ag-grid-table');
	if (ag.style.visibility === 'visible') {
		ag.style.visibility = 'hidden';
	} else {
		ag.style.visibility = 'visible';
	}
}

// Create column selection menu
function renderColumnSelection() {
	fetch('/cols')
	.then(res => res.json())
	.then(data => {
		let cols = data;
		let formDiv = document.createElement('div');
		formDiv.setAttribute('class', 'form-group');
		document.body.insertBefore(
			formDiv, document.querySelector('#tabulator-table')
		);
		let form = document.createElement('div');
		form.setAttribute('class', 'column-selection');
		let ltext = document.createTextNode('Choose columns to display');
		let textWrapper = document.createElement('div');
		textWrapper.setAttribute('class', 'column-menu-title');
		textWrapper.appendChild(ltext);
		formDiv.appendChild(textWrapper);
		formDiv.appendChild(form);
		cols.forEach((val, i) => {
			let columnCheck = document.createElement('div');
			columnCheck.setAttribute('class', 'column-checkbox');
			let input = document.createElement('input');
			input.setAttribute('type', 'checkbox');
			input.checked = true;
			input.setAttribute('onclick','handleColumnSelect(this);')
			input.setAttribute('name', 'column');
			input.setAttribute('id', val.replace(/ /i, '-').toLowerCase());
			let label = document.createElement('label');
			let br = document.createElement('br');
			label.setAttribute('for', val.replace(/ /i, '-').toLowerCase())
			let text = document.createTextNode(val);
			label.appendChild(text);
			columnCheck.appendChild(input)
			columnCheck.appendChild(label);
			form.appendChild(columnCheck);
			form.appendChild(br);
		});
	});
}

function handleColumnSelect(e) {
console.log("Clicked, new value = " + e.checked)
let id = e.getAttribute('id');
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
	let table = document.querySelector('#tabulator-table');
	table.style.visibility = 'visible';
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
	table.style.visibility = 'visible';
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