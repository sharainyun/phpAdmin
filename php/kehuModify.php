<?php
	require "conn.php";
    $input = json_decode(file_get_contents('php://input'), true);
    $Id = $input['Id'];
	$username = $input['username'];
	$age = $input['age'];
	$sex = $input['sex'];
	$tel = $input['tel'];
	$address = $input['address'];
	mysql_query("update kehu set username='$username',age='$age',sex='$sex',tel='$tel',address='$address' where Id='$Id'");//修改kehu表里的数据  
    $res=mysql_affected_rows();//返回影响行  
    if($res>0){  
        Response::json(200,'修改成功',array(),0);
    }else{  
        Response::json(300,'修改失败',array(),0);
    }  
	mysql_close();
?>