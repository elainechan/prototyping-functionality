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
				data: {
					id: 'n' + (i+1).toString(),
					position: {
						x: Number(val.station_lon) * 10000,
						y: Number(val.station_lat) * -10000
					},
					selected: false,
					selectable: true
				}
			};
			nodes.push(entry);
		});
		return nodes;
	})
}
console.log(nodes);

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
					id: 'e' + (i+1).toString(),
					source: 'n' + val.source_id,
					target: 'n' + val.target_id,
				}
			};
			edges.push(entry);
		});
		return edges;
	})
}
console.log(edges);

cytoscape({
  container: document.getElementById('cytoscape-circuit'),
  elements: [
    { // node n1
      group: 'nodes', 
      data: {
        id: 'n1',
        parent: 'nparent',
      },
      scratch: {
        _foo: 'bar'
      },
      position: { 
        x: 100,
        y: 100
      },
      selected: false, 
      selectable: true,
      locked: false, 
      grabbable: true, 
      classes: 'foo bar'
    },
    { // node n2
      data: { id: 'n2' },
      renderedPosition: { x: 200, y: 200 }
    },
    { // node n3
      data: { id: 'n3', parent: 'nparent' },
      position: { x: 123, y: 234 }
    },
    { // node nparent
      data: { id: 'nparent', position: { x: 200, y: 100 } }
    },
    { // edge e1
      data: {
        id: 'e1',
        source: 'n1',
        target: 'n2'
      }
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