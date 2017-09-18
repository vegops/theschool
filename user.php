<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 28/08/2017
 * Time: 04:40
 */
include 'includes/inc.php';
$connection = new SchoolDb();
session_start();
if(!isset($_SESSION['user'])) {
    print_r('no user');
} else {
    $user = $_SESSION['user'];
    echo (json_encode($user));
}