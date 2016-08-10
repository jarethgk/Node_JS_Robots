'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'view.view1',
    'view.view2'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}])

.run(["$rootScope", "$interval",
function($rootScope, $interval) {
	$rootScope.io = io('http://aws.dev.gcumedia.com:41337/arena');
	$rootScope.users = {};
	$rootScope.io.on('connect', function() {
		//console.log('connected to socket');
		$rootScope.$apply();
	});
	$rootScope.io.on('users', function(data) {
		$rootScope.arena = data;
		var newArray = [];
		for(var key in $rootScope.arena.scoreBoard) {
			newArray.push({ "name": key, "deaths": $rootScope.arena.scoreBoard[key].deaths, "kills": $rootScope.arena.scoreBoard[key].kills});
		}
		$rootScope.arena.scoreBoard = newArray;
		$rootScope.$apply();
	});
	window.onbeforeunload = function() {
		$rootScope.io.emit('disconnected', "arenaViewer");
	};
}])

; // Do not remove.