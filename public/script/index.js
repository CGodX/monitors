angular.module("app",["ngRoute"]).config(["$routeProvider",function(o){o.otherwise("home")}]),angular.module("app").config(["$routeProvider",function(o){o.when("/home",{templateUrl:"/temp/core/home/html/ng.home.html",controller:"homeCtrl"})}]),angular.module("app").controller("homeCtrl",["$scope",function(o){o.list=[{name:"统一用户",isRunning:!0,svn:"",ip:"",port:80,domain:"",sh:{start:"",stop:"",logsDir:""}}]}]),angular.bootstrap(document,["app"]);