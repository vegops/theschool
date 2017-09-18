<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 24/08/2017
 * Time: 08:28
 */
include 'includes/inc.php';
$connection = new SchoolDb();
session_start();
$user = $_SESSION["user"];
if($user['role'] === "owner" || $user['role'] === "manager") {
    $admin = '<li id="administrator-btn" class="nav-item">
                    <a class="nav-link">&#9656; Administration</a>
                </li>';
    echo $admin;
}


