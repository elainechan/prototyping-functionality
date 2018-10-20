const cy = cytoscape({
  container: document.getElementById('subway-circuit'),
  elements: [
    { // node n1
      data: { 
        id: 'n1',
      },
      position: {
        x: 100,
        y: 100
      },
      selected: false,
      selectable: true,
      locked: false,
      grabbable: true,
    },
    { // node n2
      data: { id: 'n2' },
      position: { x: 200, y: 200 }
    },
    { // node n3
      data: { id: 'n3'},
      position: { x: 123, y: 234 }
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

const node1  = 		{
	data: {
		id: 'n101'
	},

	position: {x: -738985.8300000001, y: -408892.48000000004}
}
const node2 = 
{ data: {
		id: 'n103'
	},
	position: {x: -739008.7, y: -408846.67}
}

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
		return cyData;
	});

	d3.csv('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaStops.csv', data => {
		//console.log(`getStops: ${JSON.stringify(data)}`);
		data.map((val,i) => {
			let entry = {
				group: 'nodes',
				data: {
					id: 'n' + val.station_id,
				},
				scratch: {
					_line: val.station_id.charAt(0)
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
		//console.log(nodes);
		cy.add(nodes);
		window.localStorage.setItem('nodes', nodes);
		return nodes;
  });
  
  d3.csv('https://raw.githubusercontent.com/elainechan/prototyping-functionality/master/mtaEdges.csv', data => {
		//console.log(`getEdges: ${JSON.stringify(data)}`);
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
		//console.log(edges);
		cy.add(edges);
		return edges;
  });
  
  const cy = cytoscape({
    container: document.getElementById('subway-circuit'),
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
          'content': 'data(id)',
        }
      }
    ]
  });

  app.get('/',(req, res) => {
    res.sendFile('/Users/Leo/prototyping-functionality/index.html');
  });