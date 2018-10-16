const mongoose = require('mongoose');
const Subway = require('../model/subway.model');
const { lowerKeysAndReplaceSpaceWithDash } = require('./utils');
const d3 = require('d3-dsv')

exports.getCircuitData = (req, res) => {
	Subway.find()
	.lean()
	.exec((err, data) => {
		if(err) {
			console.log(err);
		}
		let nodes = [];
		let newData = data.map((val, i) => {
			val.id = i + 1;
			val = lowerKeysAndReplaceSpaceWithDash(val);
			nodes.push({
				'id': val.id,
				'line': val['line'],
				'station-name': val['station-name'],
				'station-latitude': val['station-latitude'],
				'station-longitude': val['station-longitude']
			})
		});
		return res.json(nodes);
	})
}

exports.getMtaStops = (req, res) => {
  d3.csvParse('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaStops.csv')
    .then(res => res.json());
}

/* data model
"elements" : {
    "nodes" : [ {
      "data" : {
        "id" : "8220",
        "station_name" : "京成高砂",
        "close_ymd" : "",
        "lat" : 35.750932,
        "lon" : 139.866875,
        "post" : "",
        "e_status" : 0,
        "SUID" : 8220,
        "station_g_cd" : 2300110,
        "add" : "東京都葛飾区高砂五丁目28-1",
        "line_cd" : 99340,
        "selected" : false,
        "open_ymd" : "",
        "name" : "9934001",
        "pref_name" : "東京都",
        "shared_name" : "9934001",
        "y" : -357509.32,
        "x" : 1398668.75
      },
      "position" : {
        "x" : 1398668.75,
        "y" : -357509.32
      },
      "selected" : false
*/