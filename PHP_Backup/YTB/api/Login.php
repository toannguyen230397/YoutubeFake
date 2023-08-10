<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj['username'];
	$password = $obj['password'];
	
	$query = 'SELECT * FROM user WHERE Username="'.$username.'"';
	$query_output =  mysqli_query($ketnoi,$query);
	if(mysqli_num_rows($query_output) > 0)
	{
		$row = mysqli_fetch_assoc($query_output);
		$row_Password = $row['Password'];
		if($password == $row_Password)
		{
			$Message="true";
		}
		else
		{
			$Message="Mật khẩu không đúng";
		}
		$Response[]=array("Message"=>$Message);
		echo json_encode($Response);
	}
	else
	{
		$Message="Tên tài khoản không đúng";
		$Response[]=array("Message"=>$Message);
		echo json_encode($Response);
	}
?>