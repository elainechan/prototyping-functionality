'use strict';

/*
d3.text('./README.md').then(data => {
	var converter = new showdown.Converter();
	var mdHTML = converter.makeHtml(data);
	console.log(mdHTML);
	console.log(typeof mdHTML); // string
	$('body')
		.append(mdHTML.toString()); // prepend html to top of body
});
*/
fetch('/columns')
.then(res => {
	return res.json();
})
.then(data => {
	console.log(JSON.stringify(data));
	let cols = data;
	const table = new Tabulator("#example-table", {
		height: 300,
		columns: cols
	});
	return;
});



// specify the columns
var columnDefs = [
	{headerName: "Make", field: "make"},
	{headerName: "Model", field: "model"},
	{headerName: "Price", field: "price"}
];

// specify the data
var rowData = [
	{make: "Toyota", model: "Celica", price: 35000},
	{make: "Ford", model: "Mondeo", price: 32000},
	{make: "Porsche", model: "Boxter", price: 72000}
];

// let the grid know which columns and what data to use
var gridOptions = {
	columnDefs: columnDefs,
	rowData: rowData
};

// lookup the container we want the Grid to use
var eGridDiv = document.querySelector('#myGrid');

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(eGridDiv, gridOptions);
