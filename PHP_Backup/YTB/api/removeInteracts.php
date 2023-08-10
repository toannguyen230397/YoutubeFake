<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$mavd = $obj['mavd'];
	$username = $obj['username'];
    $type = $obj['type'];

    $query = "DELETE FROM interacts WHERE MaVD='$mavd' AND Username='$username' AND Type='$type'";

    $result = mysqli_query($ketnoi, $query);

    if($result){
        $Message="true";
        $Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }else{
        $Message="tương tác thất bại";
		$Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }
?>