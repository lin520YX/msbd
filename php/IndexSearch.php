<?php
	include 'db.php';
	$type = $_GET['type'];
	$searchkey = $_GET["searchkey"];
	$mydb = new DB($type);
//	模糊匹配搜索
	$result = $mydb->select("SELECT * FROM ".$type." WHERE question LIKE '%".$searchkey."%'");
	print_r(json_encode($result));
?>