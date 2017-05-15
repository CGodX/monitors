var socket = require('socket.io');
var db = require('./db');
var Client = require('ssh2').Client;

var m = {
	init: function (server) {
		m.io = socket(server);
		m.io.on('connection', function (socket) {
			console.log(socket.id, 'is connected');
		});

		m.io.on('connection', function (socket) {
			socket.on(socket.id, function (arrStr) {
				var arr = JSON.parse(arrStr);

				var id = arr[0],
					log = arr[1];

				var server = db.findById(db.type.server, id);

				var cmd = 'tail -f -c 10000 ' + server.tomcat + '/logs/' + log;
				console.log(cmd);
				const conn = new Client();
				socket.on('disconnect', function () {
					console.log('socket disconnect');
					conn.end();
				});
				conn.on('ready', function () {
					console.log('ssh connect success, ', cmd);
					conn.exec(cmd, function (err, stream) {
						stream.on('data', function (data) {
							socket.emit(socket.id, data + '');
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
		});
	}
};

module.exports = m;