<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	$Id = uniqid("", true);//生成唯一的id
	$username = $input['username'];
    $type = $input['type'];
    $status = '1';
    $remark = $input['remark'];
    $startTime = $input['startTime'];
    $endTime = $input['endTime'];
	// echo json_encode($input);
	mysql_query("insert into shenpi (username,type,status,remark,startTime,endTime) values ('$username','$type','$status','$remark','$startTime','$endTime')");
	$res=mysql_affected_rows();//返回影响行
	if($res>0){
	Response::json(200,'添加成功',array(),0); 
	}else{  
	Response::json(300,'添加失败',array(),0); 
	}  
	mysql_close();
?>