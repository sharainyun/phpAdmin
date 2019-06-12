<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	$Id = uniqid("", true);//生成唯一的id
	$username = $input['username'];
    $password = md5($input['password']);
	$userType = $input['userType'];
	$bumen = $input['bumen'];
	$time = $input['time'];
	$birthday = $input['birthday'];
	// echo json_encode($input);
	mysql_query("insert into table2 (username,password,userType,bumen,time,birthday) values ('$username','$password','$userType','bumen','time','birthday')");
	$res=mysql_affected_rows();//返回影响行
	if($res>0){
	Response::json(200,'添加成功',array(),0); 
	}else{  
	Response::json(300,'添加失败',array(),0); 
	}  
	mysql_close();
?>