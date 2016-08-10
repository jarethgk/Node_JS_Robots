'use strict';

angular.module('view.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'components/views/view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', ["$rootScope", function($rootScope) {
	$rootScope.io.on("fireResponse", function(msg) {
		console.log("fireResponse: " + msg);
	});
}])

; // do not remove.