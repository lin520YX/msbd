<?php
	include 'db.php';
	$type = $_GET['type'];
	$mydb = new DB($type);
	$result = $mydb->select("select * from ".$type);
	print_r(json_encode($result));
?>