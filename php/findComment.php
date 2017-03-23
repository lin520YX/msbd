<?php
	include 'db.php';
	$qid = $_GET['qid'];
	$mydb = new DB("comment");
	$result = $mydb->select("SELECT * FROM `comment` WHERE qid = '".$qid."'");
	print_r(json_encode($result));
?>