<?php
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
//echo "he;llo";
$img = $_POST['image'];
//echo $img;
$filename = './spreedps/dp'.generateRandomString(3).'.png';
$ifp = fopen($filename, "wb"); 

$data = explode(',', $img);
fwrite($ifp, base64_decode($data[1])); 
fclose($ifp); 
echo 'http://www.springspree.in/profilepicture/'.substr($filename,2);

?>