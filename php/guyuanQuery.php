<?php
	require "conn.php";
	$input = json_decode(file_get_contents('php://input'), true);
	// $input = file_get_contents('php://input')[0];;
	$username = $input['username'];
	$sex = $input['sex'];
	$limit1 = $input['limit']*($input['page']-1);
	$limit2 = $input['limit']*$input['page'];
	//做一个恒成立的条件
	$tj1 = " 1=1 ";
	$tj2 = " 1=1 ";
	if(!empty($username)) //第一个条件的判断（用到了模糊查询）
	{
	  $tj1 = " username like '%{$username}%'";
	}
	if(!empty($sex))
	{
	  $tj2 = "sex = '$sex'";
	}
	$res=mysql_query("select * from guyuan WHERE {$tj1} AND {$tj2} limit $limit1,$limit2");//查询guyuan表里所有数据  
	$total = mysql_num_rows(mysql_query("select * from guyuan WHERE {$tj1} AND {$tj2}"));//查询所有符合条件的数据（不包括分页条件）
	// $res=mysql_query("select * from guyuan where username='$username' and sex='$sex'");//多条件查询连接符and
	// $res=mysql_query("select * from guyuan  limit 0,$limit");//限制前面第1到limit条数据,分页
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