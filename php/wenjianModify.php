<?php
	require "conn.php";
    $input = json_decode(file_get_contents('php://input'), true);
    $Id = $input['Id'];
	$username = $input['username'];
    $time = $input['time'];
    $wenjian = $input['wenjian'];
	mysql_query("update wenjian set username='$username',time='$time',wenjian='$wenjian' where Id='$Id'");//修改wenjian表里的数据  
    $res=mysql_affected_rows();//返回影响行  
    if($res>0){  
        Response::json(200,'修改成功',array(),0);
    }else{  
        Response::json(300,'修改失败',array(),0);
    }  
	mysql_close();
?>