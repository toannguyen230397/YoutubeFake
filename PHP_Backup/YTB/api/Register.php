<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj['username'];
	$password = $obj['password'];
	
    $query = "INSERT INTO user (Username, Password) VALUES ('$username', '$password')";

    $result = mysqli_query($ketnoi, $query);

    if($result){
        $Message="true";
        $Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }else{
        $Message="Đăng ký thất bại";
		$Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }
?>