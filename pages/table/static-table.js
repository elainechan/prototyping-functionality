'use strict';
// Example: http://bl.ocks.org/ndobie/336055eed95f62350ec3
//var converter = new showdown.Converter();

// Renders table/README.md
d3.text('./README.md').then(data => {
	var converter = new showdown.Converter();
	var mdHTML = converter.makeHtml(data);
	console.log(mdHTML);
	console.log(typeof mdHTML); // string
	$('body')
		.prepend(mdHTML.toString()); // prepend html to top of body
});

// Renders table
d3.csv("./countries.csv").then((data) => {
	d3.select('body').append('h1').text('Countries of the World'); // append title
	d3.select('body').append('table'); // append table
	var table = d3.select("table"); // select table
	var	columnNames = d3.keys(data[0]); // header values
	var	thead = table.append("thead"); // append <thead>
	var	tbody = table.append("tbody"); // append <tbody>
	var sortAscending = true; // set initial sort to ascending for toggling later

	// append the header row
	thead.append("tr") // append <tr> to <thead>
		.attr('class', 'header')
		.attr('class', 'row')
		.selectAll("th") // create head <th>'s within row <tr>
		.data(columnNames) // bind header values data
		.enter()
		.append("th") // append same number of <th>'s as number of rows in data 
		.text(columnNames => columnNames)
		.on('click', data => {
			if (sortAscending) {
				bodyRows.sort((a,b) => b[data] < a[data]);
				sortAscending = false;
			} else {
				bodyRows.sort((a,b) => b[data] > a[data]);
				sortAscending = true;
			}
		});
	// set <th> key sequence
	document.querySelectorAll('th').forEach((item, i) => item.setAttribute('key', i));

	// create a row for each object in the data
	var bodyRows = tbody.selectAll("tr") // create rows
		.data(data) // bind data
		.enter()
		.append("tr") // append same number of <tr>'s as number of rows in data
		.attr("class", "body") // add class name
		.attr('class', 'row')

	bodyRows.selectAll("td") // create cells
		.data(row => {
			return columnNames.map(col => {
				return {col: col, value: row[col]} // each datapoint
			})
		})
		.enter()
		.append("td") // append cells
		.attr("style", "font-family: 'Lato'")
		.html((d) => {
			if ($.isNumeric(d.value)) {//if number is numeric, format with thousands seporator
				return formatMoney(d.value);
			} else {
				return d.value; // return data value
			};
		});
	
	function formatMoney(n) {
		return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	};
	
	// https://www.growingwiththeweb.com/2012/08/how-to-select-html-table-column-using.html
	function whichColSelected(target) { // find which column is selected through nthchild index
		return Number(target.getAttribute('key')) + 1;
	}

	function clickToHideCol(e) {
		$('th').on('click', (e) => {
			let n = whichColSelected(e.target);
			$(`table tr > td:nth-child(${n}), table tr > th:nth-child(${n})`).hide();
		});
	}
	//clickToHideCol();
	// Grey alternate rows
	d3.selectAll(".row")
		.style("background", (row, i) => {
			return i % 2 ? "#fff" : "#eee";
		});
		
	// Add footer containing link to data source
	d3.select('html')
		.append('footer')
		.append('a')
		.attr('href', 'https://www.kaggle.com/fernandol/countries-of-the-world/version/1#')
		.text('Data source');	
});
	/*
	TODO
	add data indexing colx, row y
	sort table by column value
	*/