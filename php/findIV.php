<?php
	include 'db.php';
	$table = $_GET['table'];
	$qid = $_GET['qid'];
	$mydb = new DB($table);
	$result = $mydb->select("SELECT * FROM ".$table." WHERE qid = '".$qid."'");
	print_r(json_encode($result));
?>