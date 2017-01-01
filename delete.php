<?php

echo "he;llo";
$img = '.'.substr($_POST['image'],40);
echo $img;
if(unlink("'".$img."'")
	{
		echo 'file deleted';
	}
	else
	{
		echo 'could not delete';
	}
//echo $img;
// $filename = './spreedps/dp'.generateRandomString(3).'.png';
// $ifp = fopen($filename, "wb"); 

// $data = explode(',', $img);
// fwrite($ifp, base64_decode($data[1])); 
// fclose($ifp); 
// echo 'http://www.springspree.in/profilepicture/'.substr($filename,2);
// 40
?>