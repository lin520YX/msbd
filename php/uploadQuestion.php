<?php
	include 'db.php';
	$table = $_GET['qtype'];
	
	$qid = $_GET['qid'];
	$question = $_GET['question'];
	$answer = $_GET['answer'];
	$trueAnswer = $_GET['trueAnswer'];
	$type = $_GET['type'];
	$comment = 0;
	
	$mydb = new DB($table);
	
	$data['qid']=$qid;
	$data['question']=$question;
	$data['answer']=$answer;
	$data['type']=$type;
	$data['trueAnswer']=$trueAnswer;
	$data['comment']=$comment;
	
	$result = $mydb->add($data);
	
	if($result=='1'){
		echo "录入成功";
	}else{
		echo "录入失败";
	}
?>