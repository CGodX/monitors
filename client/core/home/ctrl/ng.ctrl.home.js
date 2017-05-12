angular.module('app')
	.controller('homeCtrl', ['$scope', '$ngConfirm', 'ServerApi', 'SshApi', function ($scope, $ngConfirm, ServerApi, SshApi) {
		$scope.list = [];

		var reqs = {
			list: {},
			set: function (server, url, data) {
				reqs.list[server.id + url] = data;
			},
			get: function (server, url) {
				return reqs.list[server.id + url];
			}
		};

		$scope.req = reqs.get;

		ServerApi.list().then(function (resp) {
			$scope.list = resp.data;

			angular.forEach($scope.list, function (server) {
				angular.forEach(server.urlList, function (url) {
					ServerApi.request(server.domain + url).then(function (resp) {
						reqs.set(server, url, resp.data);
					});
				});
			});
		});

		$scope.tomactStart = function(server){
			SshApi.tomactStart(server.id);
		};

		$scope.getLogList = function (server) {
			$ngConfirm({
				title: server.name + '日志列表',
				contentUrl: '/temp/core/home/html/ng.home.log.list.html',
				columnClass: 'col-md-12',
				onScopeReady: function (scope) {
					var jc = this;
					SshApi.logList(server.id).then(function (resp) {
						scope.list = resp.data;
					});

					scope.tailLog = function (log) {
						var socket;
						$ngConfirm({
							title: server.name + '日志列表',
							content: '<pre class="log-tail">{{ log }}</pre>',
							columnClass: 'col-md-12',
							onScopeReady: function (scope) {
								scope.log = '';
								socket = io();
								socket.on('connect', function(){
									console.log(socket.id);
									socket.emit(socket.id, JSON.stringify([server.id, log]));
									socket.on(socket.id, function (msg) {
										scope.$apply(function(){
											scope.log += msg;
										});
									});
								});
							},
							onDestroy: function(){
								socket && socket.close();
							}
						});
						jc.close();
					};
				}
			});
		};

		$scope.showReqDetail = function (server, url) {
			$ngConfirm({
				title: '[' + server.domain + url + ']请求',
				content: '<pre style="color: #000; text-align: left;">{{ json }}</pre>',
				columnClass: 'col-md-12',
				onScopeReady: function (scope) {
					scope.json = JSON.stringify(reqs.get(server, url), null, 4);
				}
			});
		};

		$scope.getDomain = function (d) {
			if (/^http/.test(d)) {
				return d;
			}
			return 'http://' + d;
		};

		$scope.del = function (item) {
			$ngConfirm({
				title: '删除',
				content: '是否删除' + item.name + '?',
				buttons: {
					ok: {
						text: '删除',
						btnClass: 'btn-danger',
						action: function () {
							ServerApi.del(item.id).then(function () {
								$scope.list.remove(item);
							});
						}
					},
					n: {
						text: '取消'
					}
				}
			});
		};

		$scope.addOrEdit = function (data) {
			$ngConfirm({
				title: (data ? '编辑' : '新增') + '服务器',
				contentUrl: '/temp/core/home/html/ng.home.server.add.html',
				columnClass: 'col-md-6 col-md-offset-3',
				onScopeReady: function (scope) {
					scope.form = angular.extend({}, data || {});
				},
				buttons: {
					ok: {
						text: '保存',
						btnClass: 'btn-info',
						action: function (scope) {
							var jc = this;
							console.log(scope.form);
							ServerApi.save(scope.form).then(function (resp) {
								if (data) {
									angular.extend(data, scope.form);
								} else {
									$scope.list.push(resp.data);
								}
								jc.close();
							});
							return false;
						}
					},
					canel: {
						text: '取消'
					}
				}
			});
		};
	}]);