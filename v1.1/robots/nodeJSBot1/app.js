"use strict";

// Declare app level module which depends on views, and components
angular.module("myApp", [
    "ngRoute",
    "ngResource",
    "ngAnimate",
    "ui.bootstrap"
])
.config(["$routeProvider", function($routeProvider) {
    $routeProvider.otherwise({redirectTo: "/"});
}])

//.run(function($rootScope) {
//})

.controller("NodeJSRobotLoadCtrl", ["$rootScope", "$scope", "$timeout", "$interval", "$location", "$routeParams",
function($rootScope, $scope, $timeout, $interval, $location, $routeParams) {
	$scope.MathPI = Math.PI;
	$scope.MathTAU = $scope.MathPI * 2.0;
	$scope.scriptLoaded = false;
	$scope.scriptUrl = "nodeJSbot1.js";
	
	// Get connection to server started.
	$scope.userName = "unknown";
	$scope.connectToArena = function(robotName) {
		$scope.userName = robotName;
		nodeRobot.emit("connected", $scope.userName);
		
		nodeRobot.on("notConnected", function(data) {
			nodeRobot.emit("connected", $scope.userName);
		});
		
		nodeRobot.on("robotStatus", function(data) {
			$scope.robotData = data;
			robotData = data;
			if (robotCommand.status) { robotCommand.status(data); }
			$scope.$apply();
		});
		
		nodeRobot.on("scanInfoUpdated", function(data) {
			$scope.robotScanInfo = data;
			robotScanInfo = data;
			if (robotCommand.robotScanInfoUpdated) { robotCommand.robotScanInfoUpdated(data); }
			$scope.$apply();
		});
	};
	
	$scope.robotPageReload = function(){
		nodeRobot.emit("disconnected", robotData.name);
		nodeRobot.disconnect();
		$timeout(
			function(){location.reload(true);
		}, 250);
	};

	$scope.addScript = function(src) {
		$scope.scriptElement = document.createElement("script");
		$scope.scriptElement.setAttribute("id", "addedScriptTag");
		$scope.scriptElement.setAttribute("src", src);
		document.body.appendChild($scope.scriptElement);
	};

	$scope.scriptTextboxAction = function() {
		if ($scope.scriptLoaded) return;
		if ($scope.scriptUrl === "") $scope.scriptUrl = "nodeJSbot1.js";
		
		var fileNameParse = $scope.scriptUrl.split(".");
		if (fileNameParse[(fileNameParse.length - 1)].toLowerCase() != "js") $scope.scriptUrl += ".js";
		
		$location.path("/" + $scope.scriptUrl); // Makes it faster and easier to reload the same robot.
		
		$scope.addScript($scope.scriptUrl);
		$scope.scriptLoaded = true;
	};
	
	// Pull robot name out of the url if there is one.
	$scope.robotFileName = $location.path() + "";
	$scope.robotFileName = $scope.robotFileName.slice(1, ($scope.robotFileName.length));
	if (typeof $scope.robotFileName != "string") $scope.robotFileName = "";
		else $scope.robotFileName = $scope.robotFileName.trim();
	if ($scope.robotFileName !== "") $scope.scriptUrl = $scope.robotFileName;
}])

; // Do not remove.

robotCommand.connectToArena = function(robotName) {
	var scope = angular.element(document.getElementById("NodeJSRobotLoadCtrl")).scope();
    scope.$apply(function () {
        scope.connectToArena(robotName);
    });
};