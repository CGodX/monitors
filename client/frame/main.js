angular.module('app', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
        $routeProvider.otherwise('home');
	}]);