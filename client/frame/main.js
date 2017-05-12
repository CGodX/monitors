Array.prototype.remove = function(item){
	var i = this.indexOf(item);
	if (i == -1) return;
	this.splice(i, 1);
};

angular.module('app', ['ngRoute', 'cp.ngConfirm'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise('home');
	}])
	.run(['$ngConfirmDefaults', function ($ngConfirmDefaults) {
		$ngConfirmDefaults.theme = 'supervan';
	}]);