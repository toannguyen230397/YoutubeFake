<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$title = $obj['title'];
	$hinh = $obj['hinh'];
    $theloai = $obj['theloai'];
    $username = $obj['username'];
    $video = $obj['video'];
    $posttime = $obj['posttime'];
    $luotxem = $obj['luotxem'];

    $query = "INSERT INTO videos (TenVD, Hinh, Theloai, Username, URL, PostTime, LuotXem) VALUES ('$title', '$hinh', '$theloai', '$username', '$video', '$posttime', '$luotxem')";

    $result = mysqli_query($ketnoi, $query);

    if($result){
        $Message="true";
        $Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }else{
        $Message="tải video thất bại";
		$Response[]=array("Message"=>$Message);
		echo json_encode($Response);
    }
?>