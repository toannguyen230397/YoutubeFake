<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$mavd = $obj['mavd'];

    $query = "UPDATE videos SET LuotXem = LuotXem + 1 WHERE MaVD = '$mavd'";

    $result = mysqli_query($ketnoi, $query);

    if($result){
        $Message="true";
        $Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }else{
        $Message="gửi tương tác thất bại";
		$Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }
?>