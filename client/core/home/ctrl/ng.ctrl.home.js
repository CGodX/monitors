angular.module('app')
	.controller('homeCtrl', ['$scope', '$ngConfirm', function($scope, $ngConfirm){
		$scope.list = [{
			name: '统一用户',
			isRunning: true,
			svn: '',
			ip: '',
			port: 80,
			domain: '',
			sh: {
				start: '',
				stop: '',
				logsDir: ''
			}
		}];

		$scope.addOrEdit = function(data){
			$ngConfirm({
				title: (data ? '编辑' : '新增') + '服务器',
				contentUrl: '/temp/core/home/html/ng.home.server.add.html',
				columnClass: 'col-md-6 col-md-offset-3',
				buttons: {
					ok: {
						text: '保存',
						btnClass: 'btn-info',
						action: function(){
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