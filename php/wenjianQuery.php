<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	// $input = file_get_contents('php://input')[0];;
	$username = $input['username'];
    $limit = $input['limit']*$input['page'];
    //做一个恒成立的条件
	$tj1 = " 1=1 ";
	$tj2 = " 1=1 ";
	if(!empty($username)) //第一个条件的判断（用到了模糊查询）
	{
	  $tj1 = " username like '%{$username}%'";
	}
    $res=mysql_query("select * from hetong WHERE {$tj1}");//查询表里所有数据
    $total = mysql_num_rows(mysql_query("select * from hetong WHERE {$tj1} AND {$tj2}"));//查询所有符合条件的数据（不包括分页条件）  
	if($res&&mysql_num_rows($res)){  
        while($sql=mysql_fetch_assoc($res)){  
            $arr[]=$sql;  
        }  
        Response::json(200,'操作成功',$arr,$total); 
    }else{  
        Response::json(200,'查询失败',array(),0);  
    }  
	mysql_close();
?>