'use strict';

function handleCircuitButton() {
	let circuit = document.querySelector('#cytoscape-circuit');
	if (circuit.style.visibility === 'visible') {
		circuit.style.visibility = 'hidden';
	} else {
		circuit.style.visibility = 'visible';
	}
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
		console.log(`graphData: ${JSON.stringify(data)}`);
		console.log(`cyData: ${JSON.stringify(cyData)}`);
		return cyData;
	});
// https://gist.githubusercontent.com/maxkfranz/2c23fe9a23d0cc8d43af/raw
const styleData = fetch('./circuit.js')
	.then(res => res.text());

Promise.all([graphData, styleData]).then(initCy);

function initCy(then) {
	var cy = window.cy = cytoscape({
		container: document.getElementById('cytoscape-circuit'),
		layout: { name: 'preset' },
		elements: then[0].elements,
		style: then[1],
		motionBlur: true,
		selectionType: 'single',
		boxSelectionEnabled: false
	});
	mendData();
} 

function mendData(){
	// because the source data doesn't connect nodes properly, use the cytoscape api to mend it:

	cy.startBatch();

	// put nodes in bins based on name
	var nodes = cy.nodes();
	var bin = {};
	var metanames = [];
	for( var i = 0; i < nodes.length; i++ ){
		var node = nodes[i];
		var name = node.data('station_name');
		var nbin = bin[ name ] = bin[ name ] || [];

		nbin.push( node );
		
		if( nbin.length === 2 ){
			metanames.push( name );
		}
	}

	// connect all nodes together with walking edges
	for( var i = 0; i < metanames.length; i++ ){
		var name = metanames[i];
		var nbin = bin[ name ];

		for( var j = 0; j < nbin.length; j++ ){
			for( var k = j + 1; k < nbin.length; k++ ){
				var nj = nbin[j];
				var nk = nbin[k];
				
				cy.add({
					group: 'edges',
					data: {
						source: nj.id(),
						target: nk.id(),
						is_walking: true
					}
				});
				
				//.css({
			//    'line-color': 'yellow'
				// });
			}
		}

	}

	cy.endBatch(); //.autolock( true );
}
	// store fetch functions in vars
// load fetch functions in Promise
// .then initiation function

// init function

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
/*
var cy = cytoscape({

  container: document.getElementById('cytoscape-circuit'), // container to render in

  elements: [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ],

  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],

  layout: {
    name: 'grid',
    rows: 1
  }

});
*/