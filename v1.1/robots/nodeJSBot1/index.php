<?php 
//Start a php session
session_start();

//The CSRF Token is to be included as a hidden field on any <form> elements and passed through with updating/insert api calls for verification and CSRF protection
$_SESSION['csrfToken']=isset($_SESSION['csrfToken']) ? $_SESSION['csrfToken'] : base64_encode(openssl_random_pseudo_bytes(32));

?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" ng-app="myApp" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Node JS Robot</title>
    
    <style>[ng-cloak] { display: none; } /* to make sure nothing shows up until it should*/</style>
    <link rel="stylesheet" href="../../css/normalize/3.1.0/normalize.css">
    <link rel="stylesheet" href="../../css/html5-boilerplate/4.3.0/main.css">
    <link rel="stylesheet" href="../../js/angular/bootstrap/0.12.0/ui-bootstrap.min.css">
    <!--link rel="stylesheet" href="app.css"-->
    <script src="../../js/modernizr/2.8.1/modernizr.min.js"></script>
    <script src="../../js/svg4everybody/2.0.0/svg4everybody.min.js"></script>
</head>
<body id="NodeJSRobotLoadCtrl" ng-controller="NodeJSRobotLoadCtrl" ng-cloak>
	<center>
		<br><br>
		Node JS Robot script loader<br>
		<!--button onclick="robotRandomDir()">random Dir</button>
		<button onclick="robotGo()">go</button>
		<button onclick="robotStop()">stop</button>
		<button onclick="robotFire()">fire</button>
		<button onclick="robotScan()">scan</button-->
		<br>
		<div ng-hide="scriptLoaded">
			Enter url of javascript file to run: (Leave empty and click button for default bot)<br>
			<textarea cols="100" rows="3" placeholder="Paste url to script here." ng-model="scriptUrl"
				ng-focus="scriptUrl = '';"></textarea><br>
			<button ng-click="scriptTextboxAction()">Load script</button>
		</div>
		<div ng-show="scriptLoaded">
			<button ng-click="robotPageReload()">Click here to reload page<br>to start a new robot</button><br><br>
			<div>{{scriptUrl}} is <span ng-hide="robotData.dead">active</span><span ng-show="robotData.dead" style="color: red; font-weight: bolder;">dead</span></div><br>
			<div style="position: absolute; left: 50%; border: 2px solid black; padding: 10px; text-align: left; transform: translate(-50%, 0);">
				{{robotData.robotIndex+1}}: {{robotData.name}} ({{robotData.socketId}})<br>
				damage: {{robotData.damage | number:2}}%<br>
				scan: {{robotData.scanInfo.angle | number:2}} rad ({{robotData.scanInfo.angle * (180/MathPI) | number:2}}&deg;)<br>
				arc: {{robotData.scanInfo.arc | number:2}} rad ({{robotData.scanInfo.arc * (180/MathPI) | number:2}}&deg;)<span ng-show="robotData.scanInfo.found">, found: {{robotData.scanInfo.target.length | number:2}}</span><br>
				position: {{robotData.position.x | number:2}} x, {{robotData.position.y | number:2}} y<br>
				heading: {{robotData.heading | number:2}} rad ({{robotData.heading * (180/MathPI) | number:2}}&deg;) - speed: {{robotData.speed | number:2}}
			</div>
		</div>
	</center>
	<br><br>
	
	<script src="../../js/socket.io/1.4.5/socket.io.js"></script>
	<script type="text/javascript">
		if (!Math.TAU) { Math.TAU = 2.0 * Math.PI; } // Math.TAU polyfill. TAU equal 2 times PI.
		function deg2rad(deg) { return Math.PI * (deg / 180); /* return rad */}
		function rad2deg(rad) { return (rad / Math.PI) * 180; /* return deg */}
		
		var nodeRobot = io("http://aws.dev.gcumedia.com:41337/arena");
		window.onbeforeunload = function(e) {
			nodeRobot.emit("disconnected", robotData.name);
			nodeRobot.disconnect();
        };
		setInterval(function() {
			//console.log("Ping from: " + (robotData.name ? (robotData.name+" (" + (robotData.robotIndex + 1) + ")") : "Unknown_robot"));
			nodeRobot.emit("connectionPing", (robotData.name ? (robotData.name+" (" + (robotData.robotIndex + 1) + ")") : "Unknown_robot"));
		}, 2500);

		var robotData = {};
		var robotScanInfo = {};
		var robotCommand = {};
		
		robotCommand.setDrive = function(newAngle, newSpeed) {
			if (typeof newAngle != "number") newAngle = 0;
			if (newAngle < (Math.TAU * -10)) newAngle = 0;
			if (newAngle < 0) newAngle += (Math.TAU * 10);
			newAngle %= Math.TAU;

			if (typeof newSpeed != "number") newSpeed = 0;
			if (newSpeed < 0)   newSpeed = 0;
			if (newSpeed > 100) newSpeed = 100;
			
			nodeRobot.emit("setDrive", { angle: newAngle, speed: newSpeed });
		};
		
		robotCommand.fireCannon = function(newAngle, newRange) {
			if (typeof newAngle != "number") newAngle = 0;
			if (newAngle < (Math.TAU * -10)) newAngle = 0;
			if (newAngle < 0) newAngle += (Math.TAU * 10);
			newAngle %= Math.TAU;
			
			if (typeof newRange != "number") newRange = 1;
			if (newRange < 1) newRange = 1;
			
			nodeRobot.emit("fireCannon", { angle: newAngle, range: newRange });
		};
		
		robotCommand.checkScanner = function(newAngle, newArc) {
			if (typeof newAngle != "number") newAngle = 0;
			if (newAngle < (Math.TAU * -10)) newAngle = 0;
			if (newAngle < 0) newAngle += (Math.TAU * 10);
			newAngle %= Math.TAU;
			
			if (typeof newArc != "number") newArc = 0.02;
			if (newArc < 0.02) newArc = 0.02; // 0.02 radians is roughly close to 1 degree.  I figure an arc should never be smaller than that.
			if (newArc > Math.TAU) newArc = Math.TAU;
			
			nodeRobot.emit("checkScanner", { angle: newAngle, arc: newArc });
		};
	</script>
	
	<!-- third-party javascript libraries *** should be from the aws.gcumedia.com/cdn *** -->
	<script src='../../js/angular/1.2.10/angular.js'></script>
	<script src='../../js/angular/1.2.10/angular-route.js'></script>
	<script src='../../js/angular/1.2.10/angular-resource.js'></script>
	<script src='../../js/angular/1.2.10/angular-animate.js'></script>
	<script src='../../js/angular/bootstrap/0.12.0/ui-bootstrap.min.js'></script>
	<script src='../../js/gsap/1.11.7/TweenMax.min.js'></script>
	
	<!-- app javascript -->
	<script src="app.js"></script>
	
	<!--[if lt IE 9]>    <script src="//aws.gcumedia.com/cdn/svg4everybody/2.0.0/svg4everybody.legacy.js"></script> <![endif]-->
	<script>svg4everybody();//enables SVG External Content Support for all browsers  https://github.com/jonathantneal/svg4everybody</script>
</body>
</html>