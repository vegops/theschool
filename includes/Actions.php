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
    protected function insertUser($name, $phone, $email, $image, $table, $role) { //insert new user
        $table === 'administrator';

        $sq = "SELECT * FROM $table WHERE `role` = 'owner'";
        $result = $this->connect()->query($sq);
        if($result->num_rows > 0) {
            echo "Only 1 Owner is allowed";
            exit();
        }

        $sql = "INSERT INTO $table (`ID`, `name`, `phone`, `email`, `image`, `role`) VALUES (NULL, '$name', '$phone', '$email', '$image', '$role')";
        $rows_affected = $this->connect()->query($sql);
        if(($rows_affected)) {
            echo "Success,";
            echo " ".$rows_affected." Student added.";
        } else {
            echo "Can't add a ". mysqli_error($this->connect())."";
            print_r($this->connect());
        }
    }
	protected function update_Course($ID, $name, $description, $image, $table) {  //update a course
		if ($table === 'administrator') {
			$data = 'NOT ALLOWED';
			return $data;
		}
		$sql = "UPDATE $table SET `name`='$name', `description`='$description', `image`='$image' WHERE `$table`.`ID`='$ID';";
		$rows_affected = $this->connect()->query($sql);
		if(($rows_affected)) {
			echo "Success,";
			echo " ".$rows_affected." Course updated.";
		} else {
//			echo "Can't update the course";
			var_dump(($rows_affected));
		}
	}
	protected function update_Student($ID, $name, $phone, $email, $image, $table, $courses) { //update a student
		if ($table === 'administrator') {
			$data = 'NOT ALLOWED';
			return $data;
		}
		$sql = "UPDATE $table SET `name`='$name', `phone`='$phone', `email`='$email', `image`='$image' WHERE `$table`.`ID`='$ID';";
		$rows_affected = $this->connect()->query($sql);
		if(($rows_affected)) {
			echo "Success,";
			echo " ".$rows_affected." Student updated.";
		} else {
			echo "Can't update the ". mysqli_error($this->connect())."";
		}
		if( count($courses) > 0 ) {
			$sql1 = " DELETE FROM `students_courses` WHERE `student_ID` = '$ID' ";
			$this->connect()->query( $sql1 );
			for ( $i = 0; $i < count( $courses ); $i ++ ) {
				$sql2 = "INSERT INTO `students_courses` (`student_ID`,`courses_ID`) VALUES ('$ID','$courses[$i]');";
				$this->connect()->query( $sql2 );
			}
		}
	}

    protected function update_User($ID, $name, $phone, $email, $image, $table, $role)
    { //update a admin user
        $table = 'administrator';

        $sq = "SELECT * FROM $table WHERE `role` = 'owner'";
        $result = $this->connect()->query($sq);
        if($result->num_rows > 0) {
            echo "Only 1 Owner is allowed";
            exit();
        }
        $sql = "UPDATE $table SET `name`='$name', `phone`='$phone', `email`='$email', `image`='$image', `role`='$role' WHERE `$table`.`ID`='$ID';";
        $rows_affected = $this->connect()->query($sql);
        if (($rows_affected)) {
            echo "Success,";
            echo " " . $rows_affected . " User updated.";
        } else {
            echo ($sql) ;
        }
    }
    protected function RemoveItem($table, $name) {  //deletes row from DB
        $sql = "DELETE FROM `$table` WHERE `$table`.`name` = '$name'";
        $result = $this->connect()->query($sql);
        print_r($result);
    }

    protected function GetAssigned($ID) {
        $sql = "SELECT `ID`, `name`, `description` FROM `course_of_student` WHERE `student_ID`='$ID';";
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
