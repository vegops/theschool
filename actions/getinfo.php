<?php
session_start();
include '../includes/inc.php';

$user = $_SESSION["user"];
$table = htmlspecialchars($_POST['list']);
//$table = 'students';
$List = new  Application();
$_SESSION[$table] = $List->showAllinfo($table);

