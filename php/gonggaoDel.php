<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	$Id = $input['Id'];
	mysql_query("delete from gonggao where Id='$Id'");//删除gonggao表里为$name的整条数据  
    $res=mysql_affected_rows();//返回影响行 
    if($res>0){  
        Response::json(200,'删除成功',array(),0);
    }else{  
        Response::json(300,'删除失败',array(),0); 
    }  
	mysql_close();
?>