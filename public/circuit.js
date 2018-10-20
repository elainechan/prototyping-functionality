'use strict';
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
				console.log(`line: ${line}`)
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
const getRoutes =
	fetch('/mtaroutes')
	.then(res => res.json())
	.then(data => {
	});

const getStopsRoutes = 
	fetch('/mtastopsroutes')
	.then(res => res.json())
	.then(data => {
		console.log(`getStopsRoutes: ${JSON.stringify(data)}`)
	});

// Fetch data then initiate Cytoscape instance
Promise.all([getStops, getEdges]).then(initCy);
// Renders network graph
function initCy(then) {
	let nodes = then[0];
	let edges = then[1];
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
	cy.nodes().forEach(ele => {
		let id = ele.data('line');
		let regex = /[a-zA-Z]/i;
		if (id === '9') {
			id = 7;
		} else if (id.match(regex)) {
			id = id.toLowerCase();
			ele.style({
				'background-image': `./icons/mta/${id}.png`
			});
		}
		ele.style({
			'background-image': `./icons/mta/${id}.png`
		});
	})
	let nodeArr = cy.nodes().toArray();
	console.log(`nodeArr: ${nodeArr}`);
	cy.edges();
}

