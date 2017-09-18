<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 31/08/2017
 * Time: 03:38
 */

class Application extends Actions
{
    public function logger($email) {
        return $this->LogIn($email);
    }

    public function showAllInfo($table) { //calls get info function
        return $this->getAllInfo($table);
    }
    public function SubmitCourse($name, $description, $image, $table) { //calls insert function
        return ($this->insertCourse($name, $description, $image, $table));
    }
    public function SubmitStudent($name, $phone, $email, $image, $table) { //calls insert function
        return ($this->insertStudent($name, $phone, $email, $image, $table));
    }
    public function DeleteItem($table, $name){ //calls delete item function
        return $this->RemoveItem($table, $name);
    }
}