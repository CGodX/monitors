angular.module('app')
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: '/temp/core/home/html/ng.home.html',
			controller: 'homeCtrl'
		}).when('/log/list/:id', {
			templateUrl: '/temp/core/home/html/ng.log.list.html',
			controller: 'logListCtrl'
		}).when('/log/tail/:id/:log', {
			templateUrl: '/temp/core/home/html/ng.log.tail.html',
			controller: 'logTailCtrl'
		});
	}]);