<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$mavd = $obj['mavd'];
	$username = $obj['username'];
    $type = $obj['type'];
    $title = $obj['title'];
    $posttime = $obj['posttime'];

    $query = "INSERT INTO interacts (MaVD, Username, Type, Title, PostTime) VALUES ('$mavd', '$username', '$type', '$title', '$posttime')";

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