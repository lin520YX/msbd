<?php
	include 'db.php';
	$qid = $_GET['qid'];
	$name = $_GET['name'];
	$say = $_GET['say'];
	$cid = $_GET['cid'];
	$table = $_GET['type'];
	
	$commentDB = new DB("comment");
	$typeDB = new DB($table);
	
	$commentData['qid']=$qid;
	$commentData['name']=$name;
	$commentData['say']=$say;
	$commentData['cid']=$cid;
	
	$commentResult = $commentDB->add($commentData);
	
	//获得评论数量
	$commentNum = count($commentDB->select("select * from comment where qid ='".$qid."'"));
	//包装数据
	$typeData['comment']=$commentNum;
	
	//插入最新的数据
	$typeResult = $typeDB->update($typeData,"qid = '".$qid."'");
	
	if($commentResult=='1'&&$typeResult=='1'){
		echo '评论成功';
	}else{
		echo '评论失败';
	}
?>