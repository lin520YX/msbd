<?php
	include 'db.php';
	$qid = $_GET['qid'];
	$table = $_GET['type'];
	
	$PraiseDB = new DB($table);
	
	
	//获得点赞数量
	$PraiseNum = $PraiseDB->select("select `praise` from ".$table." where qid ='".$qid."'");
//	print_r($PraiseNum);
	//包装数据
	$PraiseData["praise"]=$PraiseNum[0]["praise"]+1;
	//插入最新的数据
	$Result = $PraiseDB->update($PraiseData,"qid = '".$qid."'");
	
	if($Result=='1'){
		echo $PraiseData["praise"];
	}else{
		echo "点赞失败";
	}
	
?>