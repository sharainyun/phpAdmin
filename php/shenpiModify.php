<?php
	require "conn.php";
    $input = json_decode(file_get_contents('php://input'), true);
    $Id = $input['Id'];
	$oprater = $input['oprater'];
    $status = $input['status'];
    $reason = $input['reason'];
	mysql_query("update shenpi set oprater='$oprater',status='$status',reason='$reason' where Id='$Id'");//修改shenpi表里的数据  同意或拒绝
    $res=mysql_affected_rows();//返回影响行  
    if($res>0){  
        Response::json(200,'审批成功',array(),0);
    }else{  
        Response::json(300,'审批失败',array(),0);
    }  
	mysql_close();
?>