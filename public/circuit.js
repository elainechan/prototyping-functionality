'use strict';

function handleCircuitButton() {
	let circuit = document.querySelector('#cytoscape-circuit');
	circuit.style.display = 'block';
}

const columns = ['airline','airline id', 'source airport', 'source airport id', 'destination airport', 'destination airport id', 'codeshare', 'stops', 'equipment'];