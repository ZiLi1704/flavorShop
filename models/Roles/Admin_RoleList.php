<?php
    include '../../database/connect.php';
    $data = conn()->query("SELECT * FROM roles");
    if($data->num_rows >0){
        while($row = $data->fetch_assoc()){
            $output[] = $row;
        }
    }
    echo json_encode($output);
?>