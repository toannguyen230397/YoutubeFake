<?php
	//khai báo kết nối
	$sever = 'localhost';
	$user = 'root';
	$pass = '';
	$dbname = 'ytb';
	//tạo kết nối
	$ketnoi = mysqli_connect($sever, $user, $pass, $dbname);
	if(!$ketnoi)
	{
		die('Không kết nối được!');
	}
?>