<?php
	header('Content-Type: text/html;charset=utf-8');
	header("Access-Control-Allow-Origin: 192.168.0.113:8090");
    // header("Access-Control-Allow-Origin: *"); // 允许任意域名发起的跨域请求 
	// 响应类型  
	header('Access-Control-Allow-Credentials:true');
    header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // 响应头设置  
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
	$con = mysql_connect('localhost','root','123456');
	mysql_select_db('xiangmu');
	mysql_query('SET NAMES UTF8');
	class Response{ 
		public static function json($code,$message="",$data=array(),$total){ 
			$result=array( 
				'code'=>$code, 
				'message'=>$message, 
				'data'=>$data,
				'total'=>$total,
				); 
		 
		 //输出json 
		 echo json_encode($result); 
		 exit; 
		} 
	   } 
?>