<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');

    $json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj['user'];
	$screen = $obj['screen'];
	
    if($screen == 'own')
    {
        $data = "SELECT * FROM videos WHERE Username='$username'";
    }
    else
    {
        $data = "SELECT A.* FROM videos AS A, interacts AS B WHERE A.MaVD = B.MaVD AND B.Username='$username' AND B.Type='Save'";
    }

	$rs_data = mysqli_query($ketnoi,$data);
	while($row_data = mysqli_fetch_assoc($rs_data))
	{
		$array[] = $row_data;
		$json = json_encode($array,JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);
	}
	echo $json;
?>