<?php
require __DIR__ . '/../../../.jscvConfig.php';
class jscvDAO{
    public static function get($userName){
        $getData = jscvDAO::fetchDataForUserName($userName);
        $records = "{\"records\" : $getData }";
        return $records;
    }

    public static function fetchDataForUserName($userName = false){
        $sections = false;
        $records = array();
        if($userName){
            $conn = mysqli_connect(JSCV_SERVER_NAME, JSCV_USER_NAME, JSCV_PASSWORD, JSCV_DATABASE);

            if (!$conn) {
                die("Connection failed: " . mysqli_connect_error());
            }else{
                $sql = "SELECT * FROM " . JSCV_DBTABLE_SECTIONS . " s LEFT JOIN (SELECT * FROM " . JSCV_DBTABLE_USERS ." WHERE user_name = '$userName' LIMIT 1) u ". " ON s.user_id = u.user_id GROUP BY section_heading";
                $sections = mysqli_query($conn, $sql);
            }

        }
        if(mysqli_num_rows($sections) > 0){
            while($row = mysqli_fetch_assoc($sections)) {
                $records[] = jscvDAO::createSection($row);
            }
        }
        return json_encode($records);
    }

    public static function createSection($row){
        $row = new jscv($row);
        return $row;
    }
}

class jscv{
    public function __construct($row){
        $this->section_heading = $row['section_heading'];
        $this->subsection_heading = $row['subsection_heading'];
        $this->description = $row['description'];
        $this->start_date = $row['start_date'];
        $this->end_date = $row['end_date'];
        $this->first_name = $row['first_name'];
        $this->last_name = $row['last_name'];
        $this->email = $row['email'];
    }
}