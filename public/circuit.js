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
const getStops =
	fetch('/mtastops')
		.then(res => res.json())
		.then(data => {
			data.map((val,i) => {
				let entry = {
					group: 'nodes',
					data: {
						id: 'n' + val.station_id,
						name: val.station_name
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
			return nodes;
			// cy
		});
// define edges using `edges`
const edges = [];
const getEdges =
	fetch('/mtaedges')
	.then(res => res.json())
	.then(data => {
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
		return edges;
	});
// define edges color using `routes` data
function getRoutes() {
	fetch('/mtaroutes')
	.then(res => res.json())
	.then(data => {
	});
}

Promise.all([getStops, getEdges]).then(initCy);

function initCy(then) {
	let nodes = then[0];
	let edges = then[1];
	const cy = window.cy = cytoscape({
		container: document.querySelector('#cytoscape-circuit'),
		elements: nodes.concat(edges),
		layout: {
			name: 'preset'
		},
		style: [
			{
				selector: 'node',
				style: {
					'content': 'data(name)'
				}
			}
		]
	});
}