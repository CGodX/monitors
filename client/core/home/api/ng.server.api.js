angular.module('app')
	.value('ServerApiUrl', {
		save: '/server/save',
		list: '/server/list',
		del: '/server/del',
		request: '/server/request'
	})
	.service('ServerApi', ['$http', 'ServerApiUrl', function($http, ServerApiUrl){
		this.save = function(data){
			return $http.post(ServerApiUrl.save, data); 
		};

		this.del = function(id){
			return $http.post(ServerApiUrl.del + '/' + id); 
		};

		this.list = function(){
			return $http.get(ServerApiUrl.list);
		};

		this.request = function(id){
			return $http.post(ServerApiUrl.request + '/' + id); 
		};
	}]);