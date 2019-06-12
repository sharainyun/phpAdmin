<?php
	require "conn.php";
	$pnumber=$_POST['name'];
	
	$query="select * from table2 where pnumber='$pnumber'";
	$result=mysql_query($query);
	if(mysql_fetch_array($result)){
		echo true;
	}else{
		echo false;
	}
	
	
	if(isset($_POST['submit'])&&$_POST['submit']=='同意协议并注册'){
		$pn=$_POST['pnumber'];
		$ps=md5($_POST['password']);
		$query="insert table2 values(NULL,'$pn','$ps')";
		mysql_query($query);
		header('location:login.html');
	}
?>