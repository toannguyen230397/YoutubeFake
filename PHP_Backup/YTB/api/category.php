<?php
	include '../ketnoi.php';
	mysqli_set_charset($ketnoi,'UTF8');
	
	$data = 'SELECT *
			FROM videos
			ORDER BY RAND()
			';
	$rs_data = mysqli_query($ketnoi,$data);
	while($row_data = mysqli_fetch_assoc($rs_data))
	{
		$array[] = $row_data;
		$json = json_encode($array,JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);
	}
	echo $json;
?>