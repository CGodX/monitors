angular.module('app')
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/home', {
			templateUrl: '/temp/core/home/html/ng.home.html',
			controller: 'homeCtrl'
		});
	}])