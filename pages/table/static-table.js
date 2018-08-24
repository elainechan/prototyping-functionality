d3.csv("./countries.csv").then((data) => {
		function tabulate(data, columns) {
			d3.select('body').append('h1').text('Countries of the World');
			d3.select('body').append('table');
			var table = d3.select("table"),
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

		// Make list of column names
		let arr = [...Array(21).keys()].map(item => item = 'c' + item.toString());
		arr.splice(0, 1);
	
		tabulate(data, arr); //The names of the columns in the CSV file

		// Grey alternate rows
		d3.selectAll(".data-point").style("background", function(d, i) {
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