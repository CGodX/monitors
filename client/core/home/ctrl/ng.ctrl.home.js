angular.module('app')
	.controller('homeCtrl', ['$scope', function($scope){
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
	}]);