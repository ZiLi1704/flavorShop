<?php
    include '../../database/connect.php';
    $data = conn()->query("SELECT * FROM `payment_types`");
    if($data->num_rows >0){
        while($row = $data->fetch_assoc()){
            $output[] = $row;
        }
    }
    echo json_encode($output);
?>