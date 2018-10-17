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
  const stops = d3.csvParse('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaStops.csv');
  console.log(`getMtaStops: ${JSON.stringify(stops)}`);
  return stops;
}

exports.getMtaRoutes = (req, res) => {
  const routes = d3.csvParse('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaRoutes.csv');
  console.log(`getMtaRoutes: ${JSON.stringify(routes)}`);
  return routes;
}