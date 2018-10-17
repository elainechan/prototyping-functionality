'use strict';


function handleCircuitButton() {
	let circuit = document.querySelector('#cytoscape-circuit');
	if (circuit.style.visibility === 'visible') {
		circuit.style.visibility = 'hidden';
	} else {
		circuit.style.visibility = 'visible';
	}
}
const elems = []
// define nodes using `stops`
const nodes = [];
function getStops() {
	d3.csv('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaStops.csv', data => {
		console.log(`getStops: ${JSON.stringify(data)}`);
		data.map((val,i) => {
			let entry = {
				data: {
					group: 'nodes',
					id: 'n' + val.station_id,
					position: {
						x: Number(val.station_lon) * 10000,
						y: Number(val.station_lat) * -10000
					},
					selected: false,
					selectable: true
				}
			};
			elems.push(entry);
		});
		return elems;
	})
}

function getRoutes() {
	d3.csv('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaRoutes.csv', data => {
		console.log(`getRoutes: ${JSON.stringify(data)}`);
	})
}
// define edges using `edges`
const edges = [];
function getEdges() {
	d3.csv('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaEdges.csv', data => {
		console.log(`getEdges: ${JSON.stringify(data)}`);
		data.map((val, i) => {
			let entry = {
				data: {
					group: 'edges',
					id: 'e' + (i+1).toString(),
					source: 'n' + val.source_id,
					target: 'n' + val.target_id,
				}
			};
			elems.push(entry);
		});
		console.log(elems);
		cytoscape({
			container: document.getElementById('cytoscape-circuit'),
			elements: elems,
			layout: {
				name: 'preset'
			},
			style: [
				{
					selector: 'node',
					style: {
						'content': 'data(id)'
					}
				}
			]
		});
		return elems;
	})
}



// define colors of edges using `routes`

/*
  [
		{
			"station_id":"101",
			"station_name":"Van Cortlandt Park - 242 St","station_lat":"40.889248","station_lon":"-73.898583"},
		{
			"station_id":"103",
			"station_name":"238 St","station_lat":"40.884667","station_lon":"-73.90087"}
	]
*/
const cyData = {
	'elements': {
		'nodes': [
		]
	}
}
const graphData = fetch('/cdata')
	.then(res => res.json())
	.then(data => {
		data.map(data => {
			cyData['elements']['nodes'].push({
				'data': data,
				'position': {
					'x': data['station-longitude'] * 10000,
					'y': -(data['station-latitude'] * 10000)
				},
				'selected': false
			});
		});
		console.log(`graphData: ${JSON.stringify(data)}`);
		console.log(`cyData: ${JSON.stringify(cyData)}`);
		return cyData;
	});

getStops();
getRoutes();
getEdges();
