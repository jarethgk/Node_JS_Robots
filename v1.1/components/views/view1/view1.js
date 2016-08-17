'use strict';

angular.module('view.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'components/views/view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.controller('View1Ctrl', ["$rootScope", "$scope", "$filter", "$timeout", "$interval",
function($rootScope, $scope, $filter, $timeout, $interval) {
	$scope.MathPI = Math.PI;
	$scope.MathTAU = $scope.MathPI * 2.0;
	
	$scope.usersShow = false;
	$scope.numOfRobots = 0;

	$interval(function() {
		//console.log("Sending ping.");
		$rootScope.io.emit("connectionPing", "arenaViewer");
	}, 2500);
	
	//$rootScope.io.emit("connected", "arenaViewer");
	$rootScope.io.on('notConnected', function(data) {
		//console.log('Not connected to socket. Attempt reconnect.');
		$rootScope.io.emit("connected", "arenaViewer");
		$rootScope.$apply();
	});
	
	var canvas = document.getElementById("robotArena");
	var canvasContext = canvas.getContext('2d');
	//console.log(canvas.width, canvas.height);
	
	$scope.robotIcon = new Image();
	$scope.robotIcon.src = "img/android_robot.png";
	$scope.robotIcon.width = "40";
	$scope.robotIcon.height = "40";
	$scope.robotIcon.onload = function() {
		$scope.robotIcon.loaded = true;
	};
	
	$scope.bulletIcon = new Image();
	$scope.bulletIcon.src = "img/energyBullet.png";
	$scope.bulletIcon.width = "10";
	$scope.bulletIcon.height = "10";
	$scope.bulletIcon.onload = function() {
		$scope.bulletIcon.loaded = true;
	};
	
	$scope.deadIcon = new Image();
	$scope.deadIcon.src = "img/skullAndCrossBones.png";
	$scope.deadIcon.width = "30";
	$scope.deadIcon.height = "30";
	$scope.deadIcon.onload = function() {
		$scope.deadIcon.loaded = true;
	};
	
	$scope.animate = function() {
		// Clear out the frame for next canvas draw.
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		
		if ($scope.robotIcon.loaded && $scope.bulletIcon.loaded && typeof $rootScope.arena != "undefined") {
			if ($rootScope.arena.users) {
				var userIndex = 0;
				$scope.numOfRobots = 0;
				for(var socketId in $rootScope.arena.users) {
					if ($rootScope.arena.users[socketId].type == "robot") {
						$scope.numOfRobots++;
						if ($rootScope.arena.users[socketId].robot.dead) {
							canvasContext.drawImage($scope.deadIcon,
								(((canvas.width  - 40) * ($rootScope.arena.users[socketId].robot.position.x / $rootScope.arena.size.x)) - ($scope.deadIcon.width  / 2)) + 20,
								(((canvas.height - 40) * ($rootScope.arena.users[socketId].robot.position.y / $rootScope.arena.size.y)) - ($scope.deadIcon.height / 2)) + 20,
								$scope.deadIcon.width, $scope.deadIcon.height // Width and height of painted image.
							);
						} else {
							canvasContext.drawImage($scope.robotIcon,
								(((canvas.width  - 40) * ($rootScope.arena.users[socketId].robot.position.x / $rootScope.arena.size.x)) - ($scope.robotIcon.width  / 2)) + 20,
								(((canvas.height - 40) * ($rootScope.arena.users[socketId].robot.position.y / $rootScope.arena.size.y)) - ($scope.robotIcon.height / 2)) + 20,
								$scope.robotIcon.width, $scope.robotIcon.height // Width and height of painted image.
							);
						}
						canvasContext.font = "10px Arial";
						canvasContext.fillText(($rootScope.arena.users[socketId].index + 1),
								(((canvas.width  - 40) * ($rootScope.arena.users[socketId].robot.position.x / $rootScope.arena.size.x)) + ($scope.robotIcon.width  / 2) - 12) + 20,
								(((canvas.height - 40) * ($rootScope.arena.users[socketId].robot.position.y / $rootScope.arena.size.y)) + ($scope.robotIcon.height / 2) - 2)  + 20
						);
					}
					userIndex++;
				}
			}
			if ($rootScope.arena.missiles) {
				$rootScope.arena.missiles.forEach(function(item, index) {
					canvasContext.drawImage($scope.bulletIcon,
						(((canvas.width  - 40) * (item.position.x / $rootScope.arena.size.x)) - ($scope.bulletIcon.width  / 2)) + 20,
						(((canvas.height - 40) * (item.position.y / $rootScope.arena.size.y)) - ($scope.bulletIcon.height / 2)) + 20,
						$scope.bulletIcon.width, $scope.bulletIcon.height // Width and height of painted image.
					);
				});
			}
			if ($rootScope.arena) {// Count number of users
				$scope.numUsers = Object.keys($rootScope.arena.users).length;
			}
		}
		
		window.requestAnimationFrame($scope.animate);
	};
	$scope.animate(); // Initial Kick off of the animation cycle
}])

; // do not remove.