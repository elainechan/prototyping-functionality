'use strict';
function handleCircuitButton() {
	let circuit = document.querySelector('#cytoscape-circuit');
	if (circuit.style.visibility === 'visible') {
		circuit.style.visibility = 'hidden';
	} else {
		circuit.style.visibility = 'visible';
	}
}
// define nodes using `stops`
const nodes = [];
function getStops() {
	d3.csv('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaStops.csv', data => {
		console.log(`getStops: ${JSON.stringify(data)}`);
		data.map((val,i) => {
			let entry = {
				group: 'nodes',
				data: {
					id: 'n' + val.station_id,
				},
				position: {
					x: (Number(val.station_lon))*10000,
					y: -(Number(val.station_lat))*10000
				},
				selected: false,
				selectable: true
			};
			nodes.push(entry);
			//cy.add(entry);
		});
		console.log(nodes);
		cy.add(nodes);
		window.localStorage.setItem('nodes', nodes);
		return nodes;
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
				group: 'edges',
				data: {
					id: 'e' + (i+1).toString(),
					source: 'n' + val.source_id,
					target: 'n' + val.target_id,
				}
			};
			edges.push(entry);
			//cy.add(entry);
		});
		console.log(edges);
		cy.add(edges);
		return edges;
	})
}

const cy = cytoscape({
	container: document.getElementById('cytoscape-circuit'),
	elements: [
		{
			data: {
				id: 'n101'
			},
		
			position: {x: -738985.8300000001, y: -408892.48000000004}
		},
		{ data: {
			id: 'n103'
		},
		position: {x: -739008.7, y: -408846.67}
	}
	],
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

getStops();
getRoutes();
getEdges();
