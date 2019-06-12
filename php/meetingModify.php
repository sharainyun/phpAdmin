<?php
	require "conn.php";
    $input = json_decode(file_get_contents('php://input'), true);
    $Id = $input['Id'];
	$faburen = $input['faburen'];
	$time = $input['time'];
	$bumen = $input['bumen'];
	$remark = $input['remark'];
	mysql_query("update huiyi set faburen='$faburen',time='$time',bumen='$bumen',remark='$remark' where Id='$Id'");//修改kehu表里的数据  
    $res=mysql_affected_rows();//返回影响行  
    if($res>0){  
        Response::json(200,'修改成功',array(),0);
    }else{  
        Response::json(300,'修改失败',array(),0);
    }  
	mysql_close();
?>