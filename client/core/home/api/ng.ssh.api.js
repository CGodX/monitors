angular.module('app')
	.value('SshApiUrl', {
		logList: '/ssh/log/list',
		logTail: '/ssh/log/tail',
		tomactStart: '/ssh/tomcat/start'
	})
	.service('SshApi', ['$http', 'SshApiUrl', function($http, SshApiUrl){
		this.logList = function(id){
			return $http.post(SshApiUrl.logList + '/' + id); 
		};

		this.logTail = function(id, log){
			return $http.post(SshApiUrl.logTail + '/' + id + '/' + log); 
		};

		this.tomactStart = function(id){
			return $http.post(SshApiUrl.tomactStart + '/' + id); 
		};
	}]);