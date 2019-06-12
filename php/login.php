<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	// $input = file_get_contents('php://input')[0];;
	$username = $input['username'];
	$password = md5($input['password']);
	$userType = $input['userType'];
	// echo json_decode(file_get_contents('php://input'), true);
	// $password=md5($_POST['password']);
	
	
	$query="select * from table2 where username='$username' and password='$password' and userType='$userType'";
	$result=mysql_query($query);
	$arr = array();

	// echo json_encode($fruits);
	if(mysql_fetch_array($result)){
		Response::json(200,'登陆成功',$arr,0);
	}else{
		Response::json(405,'用户名或密码不正确',$arr,0);
	}
	mysql_close();
	
?>