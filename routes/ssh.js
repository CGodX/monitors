var express = require('express');
const uuid = require('uuid/v1');
var Client = require('ssh2').Client;
var db = require('./util/db');
var socket = require('./util/socket');
var router = express.Router();

router.all('/log/list/:id', function (req, res) {
	var server = db.findById(db.type.server, req.params.id);
	console.log('ssh ' + server.name);
	var cmd = 'ls ' + server.tomcat + '/logs';
	console.log(cmd);

	const conn = new Client();
	conn.on('ready', function () {

		conn.exec(cmd, function (err, stream) {
			var d = ''
			stream.on('close', function () {
				conn.end();
				res.json(d.split('\n'));
			}).on('data', function (data) {
				d += data;
			});
		});
	}).on('end', function () {
		console.log(cmd);
		console.log('ssh Client disconnected');
	}).connect({
		port: 22,
		host: server.ip,
		username: server.account,
		password: server.password
	});
});

router.all('/log/tail/:id/:log', function (req, res) {
	var server = db.findById(db.type.server, req.params.id);

	var cmd = 'tail -f ' + server.tomcat + '/logs/' + req.params.log;
	console.log(cmd);

	const conn = new Client();
	conn.on('ready', function () {
		var id = uuid();
		res.send(id);

		socket.io.on('connection', function (socket) {
			socket.on('callback', function (cid) {
				if (id == cid) {
					socket.on('disconnect', function () {
						conn.end();
					});
				}
			});
		});
		conn.exec(cmd, function (err, stream) {
			stream.on('data', function (data) {
				socket.io.emit(id, data + '');
			});
		});
	}).on('end', function () {
		console.log(cmd);
		console.log('ssh Client disconnected');
	}).connect({
		port: 22,
		host: server.ip,
		username: server.account,
		password: server.password
	});
});

router.all('/tomcat/start/:id', function (req, res, next) {
	var server = db.findById(db.type.server, req.params.id);

	var cmd = 'sh ' + server.tomcat + '/bin/startup.sh';
	console.log(cmd);

	const conn = new Client();
	conn.on('ready', function () {
		console.log('ssh connect success, ', cmd);
		conn.exec(cmd, function (err, stream) {
			stream.on('close', function () {
				conn.end();
				res.send('success');
			}).on('data', function (data) {
				console.log(data + '');
			});
		});
	}).on('end', function () {
		console.log(cmd);
		console.log('ssh Client disconnected');
	}).connect({
		port: 22,
		host: server.ip,
		username: server.account,
		password: server.password
	});
});

module.exports = router;
