<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	// $input = file_get_contents('php://input')[0];;
	$username = $input['username'];
	$password = md5($input['oldPassword']);
	$newPassword = md5($input['checkPass']);
	
	$query="select * from table2 where username='$username' and password='$password'";
	$result=mysql_query($query);
	$arr = array();

	// echo json_encode($fruits);
	if(mysql_fetch_array($result)){
		//用户名密码正确
		mysql_query("update table2 set password='$newPassword' where username='$username'");//修改table2表里的数据  
		$res1=mysql_affected_rows();//返回影响行  
		if($res1>0){  
			Response::json(200,'密码修改成功',array(),0);
		}else{  
			Response::json(300,'密码修改失败',array(),0);
		}  
	}else{
		Response::json(405,'原始密码不正确',array(),0);
	}
	mysql_close();
	
?>