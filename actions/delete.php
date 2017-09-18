<?php
include '../includes/inc.php';
session_start();
$user = $_SESSION["user"];
$table = htmlspecialchars($_POST['table']);
$name = htmlspecialchars($_POST['name']);
//$table = 'students';

$removal = new Application();
echo ($removal->DeleteItem($table, $name));