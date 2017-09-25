<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 04/09/2017
 * Time: 05:47
 */

include '../includes/inc.php';

$table = htmlspecialchars($_POST['list']);

if(isset($_POST['ID'])){$ID = htmlspecialchars($_POST['ID']);}
if(isset($_POST['name'])){$name = htmlspecialchars($_POST['name']);}
if(isset($_POST['description'])){$description = htmlspecialchars($_POST['description']);}
if(isset($_POST['image'])){$image = htmlspecialchars($_POST['image']);}
if(isset($_POST['email'])){$email = htmlspecialchars($_POST['email']);}
if(isset($_POST['phone'])){$phone = htmlspecialchars($_POST['phone']);}
if(isset($_POST['role'])){$role = htmlspecialchars($_POST['role']);}
if(isset($_POST['courses'])){$courses = (($_POST['courses']));}


$item = new Application();

if($table==='courses') {
    print ($item->UpdateCourse($ID, $name, $description, $image, $table));
} elseif ($table==='students') {
    print ($item->UpdateStudent($ID, $name, $phone, $email ,$image, $table, $courses));
} elseif ($table==='users') {
	print ($item->UpdateUser($ID, $name, $phone, $email ,$image, $table, $role));
} else {
    echo "unknown error";
}

?>