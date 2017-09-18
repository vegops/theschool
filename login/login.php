<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 22/08/2017
 * Time: 18:19
 */
include '../includes/inc.php';

$email = htmlspecialchars($_POST['email']);
$pass = htmlspecialchars($_POST['pass']);
$encrypted_pass = md5($pass);

$log = new Application($email);

$user = $log->Logger($email);

if($encrypted_pass === $user['password']) {
    unset($user['password']);
    session_start();
    $_SESSION["user"] = $user;
    echo 'success';
} else {
    echo "&#10008; E-mail or Password are incorrect!";
}
