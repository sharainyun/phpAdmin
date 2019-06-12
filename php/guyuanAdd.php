<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	$Id = uniqid("", true);//生成唯一的id
	$username = $input['username'];
	$age = $input['age'];
	$sex = $input['sex'];
	$bumen = $input['bumen'];
    $address = $input['address'];
    $pwd = $input['pwd'];
    $xingming = $input['xingming'];
    $xinzi = $input['xinzi'];
	$address = $input['address'];
	mysql_query("insert into guyuan(username,age,sex,bumen,address,pwd,xingming,xinzi) values ('$username','$age','$sex','$bumen','$address','$pwd','$xingming','$xinzi')");
	$res=mysql_affected_rows();//返回影响行  
	if($res>0){  
	Response::json(200,'添加成功',array(),0); 
	}else{  
	Response::json(300,'添加失败',array(),0); 
	}  
	mysql_close();
?>