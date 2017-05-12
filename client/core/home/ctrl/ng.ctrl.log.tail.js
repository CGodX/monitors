angular.module('app')
	.controller('logTailCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
		$scope.log = '';
		socket = io();
		socket.on('connect', function(){
			socket.emit(socket.id, JSON.stringify([$routeParams.id, $routeParams.log]));
			socket.on(socket.id, function (msg) {
				$scope.$apply(function(){
					$scope.log += msg;
					document.body.scrollTop = document.body.offsetHeight + document.body.scrollTop;
				});
			});
		});
	}]);