<?php
include '../includes/inc.php';
session_start();
$user = $_SESSION["user"];
$table = htmlspecialchars($_POST['list']);
//$table = 'students';

$List = new  Application();
$_SESSION[$table] = $List->showAllinfo($table);

