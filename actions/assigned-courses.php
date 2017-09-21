<?php
include '../includes/inc.php';
session_start();
$ID = htmlspecialchars($_POST['ID']);

$List = new  Application();
$_SESSION['assignedCourses'] = ( $List->ShowAssigned($ID) );

