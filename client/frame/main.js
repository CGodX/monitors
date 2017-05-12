angular.module('app', ['ngRoute', 'cp.ngConfirm'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise('home');
	}])
	.run(['$ngConfirmDefaults', function ($ngConfirmDefaults) {
		$ngConfirmDefaults.theme = 'supervan';
	}]);