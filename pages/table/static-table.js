'use strict';
// Example: http://bl.ocks.org/ndobie/336055eed95f62350ec3
//var converter = new showdown.Converter();

d3.csv("./countries.csv").then((data) => {
		function tabulate(data, columns) {
			d3.select('body').append('h1').text('Countries of the World');
			d3.select('body').append('table');
			var table = d3.select("table"),
				columnNames = [], // initialize empty list for populating later
				thead = table.append("thead"),
				tbody = table.append("tbody");
	
			// append the header row
			thead.append("tr")
				.selectAll("th")
				.data(columnNames)
				.enter()
				.append("th")
				.text(columnNames => columnNames);
	
			// create a row for each object in the data
			var rows = tbody.selectAll("tr")
				.data(data)
				.enter()
				.append("tr")
				.attr("class", "row")
	
			// create a cell in each row for each column
			var cells = rows.selectAll("td")
				.data(row => {
					return columns.map(column => {
						return { column: column, value: row[column] };
					});
				})
				.enter()
				.append("td")
				.attr("style", "font-family: 'Lato'")
				.html((d) => {
					if ($.isNumeric(d.value)) {//jQuery function checks if number is numeric, if it is formats it with thousands seporator
						return formatMoney(d.value)
					} else {
						return d.value;
					};
				});
	
			return table;
		};

		// Make list of column names
		let arr = [...Array(21).keys()].map(item => item = 'c' + item.toString());
		arr.splice(0, 1);
	
		tabulate(data, arr); //The names of the columns in the CSV file

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
	
		function formatMoney(n) {
			return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
		};
});


d3.text('./README.md').then(data => {
		var converter = new showdown.Converter();
		var mdHTML = converter.makeHtml(data);
		console.log(mdHTML);
		console.log(typeof mdHTML); // string

		$('body')
			.prepend(mdHTML.toString());
	});