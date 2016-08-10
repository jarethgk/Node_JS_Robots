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
    
    <title>Node JS Robots</title>
    
    <style>[ng-cloak] { display: none; } /* to make sure nothing shows up until it should*/</style>
    <link rel="stylesheet" href="css/normalize/3.1.0/normalize.css">
    <link rel="stylesheet" href="css/html5-boilerplate/4.3.0/main.css">
    <link rel="stylesheet" href="js/angular/bootstrap/0.12.0/ui-bootstrap.min.css">
    <link rel="stylesheet" href="app.css">
    <script src="js/modernizr/2.8.1/modernizr.min.js"></script>
    <script src="js/svg4everybody/2.0.0/svg4everybody.min.js"></script>
</head>
<body>
	<center><br>
		<a href="./robots/nodeJSBot1/index.php" target="_blank">
			Click to load a robot if you haven't already.
		</a>
	</center>
	<div ng-view></div>

	<!-- third-party javascript libraries *** should be from the aws.gcumedia.com/cdn *** -->
	<script src='js/angular/1.2.10/angular.js'></script>
	<script src='js/angular/1.2.10/angular-route.js'></script>
	<script src='js/angular/1.2.10/angular-resource.js'></script>
	<script src='js/angular/1.2.10/angular-animate.js'></script>
	<script src='js/angular/bootstrap/0.12.0/ui-bootstrap.min.js'></script>
	<script src='js/gsap/1.11.7/TweenMax.min.js'></script>
	<script src="js/socket.io/1.4.5/socket.io.js"></script>
	
	<!-- app javascript -->
	<script src="app.js"></script>
	<script src="components/views/view1/view1.js"></script>
	<script src="components/views/view2/view2.js"></script>

	<!--[if lt IE 9]>    <script src="//aws.gcumedia.com/cdn/svg4everybody/2.0.0/svg4everybody.legacy.js"></script> <![endif]-->
	<script>svg4everybody();//enables SVG External Content Support for all browsers  https://github.com/jonathantneal/svg4everybody</script>
</body>
</html>
