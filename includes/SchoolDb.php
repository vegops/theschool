<?php
/**
 * Created by PhpStorm.
 * User: eitha
 * Date: 30/08/2017
 * Time: 17:01
 */

class SchoolDb
{
    private $servername;
    private $username;
    private $password;
    private $database;

    // Create connection
    protected function connect ()
    {
        $this->servername = 'localhost';
        $this->username = 'root';
        $this->password = '';
        $this->database = 'the_school';

        $connection = new mysqli(
            $this->servername,
            $this->username,
            $this->password,
            $this->database
        );
    return $connection;

    }
}
