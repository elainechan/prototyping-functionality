'use strict';

// Tabulator
fetch('/tcolumns')
.then(res => {
	return res.json();
})
.then(data => {
	const table = new Tabulator("#example-table", {
		height: 300,
		columns: data
	});
	table.setData('/tdata');
	return;
});

// ag-grid
var gridOptions = {}
// lookup the container we want the Grid to use
var eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);

fetch('/agcolumns')
.then(res => res.json())
.then(data => {
	console.log(`column data: ${JSON.stringify(data)}`)
	gridOptions.api.setColumnDefs(data);
})

fetch('/agdata').then(function(response) {
	return response.json();
}).then(function(data) {
	let newData = data.map((val, i) => {
		delete val._id;
		return val;
	})
	console.log(`newData: ${JSON.stringify(newData)}`)
	gridOptions.api.setRowData(newData);
})
