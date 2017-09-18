<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 04/09/2017
 * Time: 05:47
 */

include '../includes/inc.php';

$table = htmlspecialchars($_POST['list']);
//$table = 'students';
//$name = "111111";
//$phone = "4321432532";
//$email = "32535treg@rfedgf.com";
//$image = "uploads/לוגו שאנדי.jpg";
if(isset($_POST['name'])){$name = htmlspecialchars($_POST['name']);}
if(isset($_POST['description'])){$description = htmlspecialchars($_POST['description']);}
if(isset($_POST['image'])){$image = htmlspecialchars($_POST['image']);}
if(isset($_POST['email'])){$email = htmlspecialchars($_POST['email']);}
if(isset($_POST['phone'])){$phone = htmlspecialchars($_POST['phone']);}

$item = new Application();

if($table==='courses') {
    print ($item->SubmitCourse($name, $description, $image, $table));
} elseif ($table==='students') {
    print ($item->SubmitStudent($name, $phone, $email ,$image, $table));
} else {
    echo "unknown error";
}

?>