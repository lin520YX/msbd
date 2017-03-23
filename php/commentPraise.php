<?php
	include 'db.php';
	$qid = $_GET['qid'];
	$cid = $_GET['cid'];
	
	$myDB = new DB("comment");
	
	$praiseNum = $myDB->select("select praise from comment where cid = '".$cid."'");	
	
	$data["praise"]=$praiseNum[0]["praise"]+1;
	
	$result=$myDB->update($data,"cid='".$cid."'");
	
	if($result=='1'){
		echo $data["praise"];
	}else{
		echo "点赞失败";
	}
?>