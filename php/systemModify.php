<?php
	require "conn.php";
    $input = json_decode(file_get_contents('php://input'), true);
    $Id = $input['Id'];
	$username = $input['username'];
    $password = md5($input['password']);
    $userType = $input['userType'];
    $bumen = $input['bumen'];
	$time = $input['time'];
	$birthday = $input['birthday'];
	mysql_query("update table2 set username='$username',password='$password',userType='$userType',bumen='$bumen',time='$time',birthday='$birthday' where Id='$Id'");//修改table2表里的数据  
    $res=mysql_affected_rows();//返回影响行  
    if($res>0){  
        Response::json(200,'修改成功',array(),0);
    }else{  
        Response::json(300,'修改失败',array(),0);
    }  
	mysql_close();
?>