const cy = cytoscape({
  container: document.getElementById('cytoscape-circuit'),
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
