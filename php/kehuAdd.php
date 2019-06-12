<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	$Id = uniqid("", true);//生成唯一的id
	$username = $input['username'];
	$age = $input['age'];
	$sex = $input['sex'];
	$tel = $input['tel'];
	$address = $input['address'];
	mysql_query("insert into kehu(username,age,sex,tel,address) values ('$username','$age','$sex','$tel','$address')");
	$res=mysql_affected_rows();//返回影响行  
	if($res>0){  
	Response::json(200,'添加成功',array(),0); 
	}else{  
	Response::json(300,'添加失败',array(),0); 
	}  
	mysql_close();
?>