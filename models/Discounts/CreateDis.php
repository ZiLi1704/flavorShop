<?php
    include '../../database/connect.php';
    $data = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($data->name) ){
        $error[] = 'Discount name';
    }else{
        $Name = $data->name;
    }
    if(empty($data->per)){
        $error[] = 'Percent';
    }else{
        $Per = $data->per;
    }
    if(empty($error)){
        $result = conn()->query("SELECT * FROM `discount` WHERE `name` = '".$Name."'");
        if($result->num_rows >0){
            $note = 'Discount already exist';
        }else{
            conn()->query("INSERT INTO `discount`(`name`, `discount_percent`) VALUES ('".$Name."', '".$Per."')");
        }
    }else{
        $note = implode(', ', $error)." is required";
    }   
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>