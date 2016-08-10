<?php
	$server_loc = ($_SERVER['SERVER_PORT'] == 80 ? 'http' : 'https').'://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
	header("Location: ".$server_loc."v1.1/");
	die();
?>