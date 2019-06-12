<?php
	require "conn.php";
    $input = json_decode(file_get_contents('php://input'), true);
    $Id = $input['Id'];
	$username = $input['username'];
    $type = $input['type'];
    $time = $input['time'];
    $title = $input['title'];
    $neirong = $input['neirong'];
	mysql_query("update gonggao set username='$username',type='$type',time='$time',title='$title',neirong='$neirong' where Id='$Id'");//修改shenpi表里的数据  同意或拒绝
    $res=mysql_affected_rows();//返回影响行  
    if($res>0){  
        Response::json(200,'修改成功',array(),0);
    }else{  
        Response::json(300,'修改失败',array(),0);
    }  
	mysql_close();
?>