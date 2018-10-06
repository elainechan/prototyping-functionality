'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { getCols, getTColumns, getTData, getAgColumns, getAgData } = require('./table/table.controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',(req, res) => {
	res.sendFile('/Users/Leo/prototyping-functionality/index.html');
});
app.get('/cols', getCols);
app.get('/tcolumns', getTColumns);
app.get('/tdata', getTData);
app.get('/agcolumns', getAgColumns);
app.get('/agdata', getAgData);

let server;

function runServer(databaseUrl, port=process.env.PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`App listening on port ${port}`);
				resolve();
			})
			.on('error', (err) => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	return new Promise((resolve, reject) => {
		console.log(`Closing server...`);
		server.close((err) => {
			if (err) {
				reject(err);
			}
			resolve();
		})
	})
}

if (require.main === module) {
	console.log(`Called directly.`);
	runServer(process.env.DATABASE_URL).catch((err) => console.error(err))
} else {
	console.log(`Required as a module.`);
}

module.exports = { app, closeServer, runServer };