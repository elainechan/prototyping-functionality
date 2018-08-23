d3.csv("./states.csv", function (data) {
	function tabulate(data, columns) {
		var table = d3.select("#med_inc")
			, columnNames = ["", "", "", "", "", ""]
			, thead = table.append("thead")
			, tbody = table.append("tbody");

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
			.append("tr");

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

	tabulate(data, ["c1", "c2", "c3", "c4", "c5", "c6"])//The names of the columns in the CSV file

	function formatMoney(n) {
		return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	};
});