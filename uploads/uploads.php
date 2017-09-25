<?php
session_start();
$user = $_SESSION["user"];
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists("../".$target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["file"]["size"] > 500000) {
    echo "Sorry, Photo has to be less then 500kb.";
    $uploadOk = 0;
}
// check image dimentions
list($width, $height, $type, $attr) = getimagesize($_FILES["file"]["tmp_name"]);
if ( $width > 350 || $height > 350 ){
    echo "Sorry, Photo dimensions should be upto 350px (width & height)";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    // Create directory if it does not exist
    if(!is_dir( $user["name"] ."/")) {
        mkdir( $user["name"] ."/");
    }
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $user["name"]."/".$_FILES["file"]["name"])) {
        $response[0] = "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
        $response[1] = "uploads/".$user["name"]."/".$_FILES["file"]["name"];
        print_r(json_encode($response));
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>