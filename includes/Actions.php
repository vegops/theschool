<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 31/08/2017
 * Time: 02:42
 */

class Actions extends SchoolDb
{
    public $data;

    protected function LogIn($email){
        $query = "SELECT * FROM administrator WHERE email ='".$email."'";
        $result = $this->connect()->query($query);
        $user = $result->fetch_assoc();

        return $user;
    }

    protected function getAllInfo($table) { //pulls info all from table
//        if ($table === 'administrator') {
//            $data = 'NOT ALLOWED';
//            echo $data;
//        }
        $sql = "SELECT * FROM $table";
        $this->connect()->query('SET CHARACTER SET utf8');
        $result = $this->connect()->query($sql);
        if($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
             print json_encode($data);

        } else {
            echo "no result";
        }
    }

    protected function insertCourse($name, $description, $image, $table) {  //insert new course
        if ($table === 'administrator') {
            $data = 'NOT ALLOWED';
            return $data;
        }
        $sql = "INSERT INTO $table (`ID`, `name`, `description`, `image`) VALUES (NULL, '$name', '$description', '$image')";
        $rows_affected = $this->connect()->query($sql);
        if(($rows_affected)) {
            echo "Success,";
            echo " ".$rows_affected." Course added.";
        } else {
            echo "Can't add a course";
        }
    }
    protected function insertStudent($name, $phone, $email, $image, $table) { //insert new student
        if ($table === 'administrator') {
            $data = 'NOT ALLOWED';
            return $data;
        }
        $sql = "INSERT INTO $table (`ID`, `name`, `phone`, `email`, `image`) VALUES (NULL, '$name', '$phone', '$email', '$image')";
        $rows_affected = $this->connect()->query($sql);
        if(($rows_affected)) {
            echo "Success,";
            echo " ".$rows_affected." Student added.";
        } else {
            echo "Can't add a ". mysqli_error($this->connect())."";
            print_r($this->connect());
        }
    }

    protected function RemoveItem($table, $name) {  //deletes row from DB
        $sql = "DELETE FROM `$table` WHERE `$table`.`name` = '$name'";
        $result = $this->connect()->query($sql);
        print_r($result);
    }

    protected function GetAssigned($ID) {
        $sql = "SELECT `ID`, `name` FROM `course_of_student` WHERE `student_ID`='$ID';";
        $this->connect()->query('SET CHARACTER SET utf8');
        $result = $this->connect()->query($sql);
        if($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            print json_encode($data);

        } else {
            echo "no result";
        }
    }


}
