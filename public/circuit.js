'use strict';
//const cytoscape = require('cytoscape');

function handleCircuitButton() {
	let circuit = document.querySelector('#subway-circuit');
	if (circuit.style.visibility === 'visible') {
		circuit.style.visibility = 'hidden';
	} else {
		circuit.style.visibility = 'visible';
	}
}
// define nodes using `stops`
const nodes = [];
const getStops = fetch('/mtastops')
		.then(res => res.json())
		.then(data => {
			data.map((val,i) => {
				let id = val.station_id;
				let idstring = id.toString();
				let line = idstring.charAt(0);
				//console.log(`line: ${line}`)
				let entry = {
					group: 'nodes',
					data: {
						id: 'n' + val.station_id,
						name: val.station_name,
						line: line
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
	  });
// define edges using `edges`
const edges = [];
const getEdges =
	fetch('/mtaedgesnames')
	.then(res => res.json())
	.then(data => {
		data.map((val, i) => {
			let entry = {
				group: 'edges',
				data: {
					id: 'e' + (i+1).toString(),
					source: 'n' + val.source_id,
					target: 'n' + val.target_id,
					source_name: val.source_name,
					target_name: val.target_name
				},
				style: {
					'width': 5
				}
			};
			edges.push(entry);
			//cy.add(entry);
		});
		console.log(edges);
		return edges;
	});
// define edges color using `routes` data
const getRoutes =
	fetch('/mtaroutes')
	.then(res => res.json())
	.then(data => {
		//console.log(`getRoutes: ${JSON.stringify(data)}`);
	});

const getStopsRoutes = 
	fetch('/mtastopsroutes')
	.then(res => res.json())
	.then(data => {
		//console.log(`getStopsRoutes: ${JSON.stringify(data)}`);
	});

const colors = []
const getColors = fetch('/mtacolors')
	.then(res => res.json())
	.then(data => {
		console.log(`getColors: ${JSON.stringify(data)}`);
		data.map(val => {
			let lineString = val.line_name.toString();
			let entry = {
				line_name: lineString,
				hexcolor: val.hexcolor
			}
			colors.push(entry);
		});
		console.log(`colors: ${JSON.stringify(colors)}`);
		return colors;
	})

// Fetch data then initiate Cytoscape instance
Promise.all([getStops, getEdges, getColors]).then(initCy);
// Renders network graph
function initCy(then) {
	let nodes = then[0];
	let edges = then[1];
	let colors = then[2];
	const cy = window.cy = cytoscape({
		container: document.getElementById('subway-circuit'),
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
// Adds icons to nodes
	cy.nodes().forEach(node => {
		let id = node.data('line');
		let regex = /[a-zA-Z]/i;
		if (id === '9') {
			id = 7;
		} else if (id.match(regex)) {
			id = id.toLowerCase();
			node.style({
				'background-image': `./icons/mta/${id}.png`
			});
		}
		node.style({
			'background-image': `./icons/mta/${id}.png`
		});
	})
	// Renders edges in colors according to train lines
	cy.edges().forEach(edge => {
		let line = edge.data('source')[1];
		if (line === 'S') {
			line = 'GS';
		}
		//console.log(`edge line: ${line}`);
		colors.forEach((val, i) => {
			if (line === val.line_name) {
				//console.log(`line: ${line}, val.line_name: ${val.line_name}, val.hexcolor: ${val.hexcolor}`);
				let hex = '#' + val.hexcolor;
				edge.style({
					'line-color': hex
				});
				/*
				if (line === 'A') { // renders A line wider
					edge.style({
						'width': 10
					});
				}
				*/
				if (line === 'GS') { // renders S line dashed
					edge.style({
						'line-style': 'dashed'
					})
				}
			}
		})

	})
// Alert on click node
	cy.on('click', 'node', (e) => {
		let targetNode = e.target;
		alert(`Node ID: ${targetNode.id()}\nStation Name: ${targetNode.data('name')}`);
	});

	cy.on('click', 'edge', (e) => {
		let targetEdge = e.target;
		targetEdge.style({
			'width': 14
		})
		alert(`Edge ID: ${targetEdge.id()}\nOrigin: ${targetEdge.data('source_name')}\nDestination: ${targetEdge.data('target_name')}`);
		cy.edges().forEach(edge => {
			if (edge.id() !== e.target.id()) {
				edge.style({
					'width': 5
				})
			}
		})
	})

	let nodeArr = cy.nodes().toArray();
	console.log(`nodeArr: ${nodeArr}`);
	cy.edges();
}