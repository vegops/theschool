<?php
include '../includes/inc.php';
session_start();
$ID = htmlspecialchars($_POST['ID']);

$List = new  Application();
print_r( $List->ShowAssigned($ID) );

