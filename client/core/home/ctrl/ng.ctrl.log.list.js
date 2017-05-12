angular.module('app')
	.controller('logListCtrl', ['$scope', 'SshApi', '$routeParams', function($scope, SshApi, $routeParams){

		$scope.id = $routeParams.id;

		SshApi.logList($routeParams.id).then(function (resp) {
			$scope.list = resp.data;
		});
	}]);