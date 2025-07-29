<?php
    include '../../database/connect.php';
    $data = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($data->name)){
        $error[] = 'Rename Payment';
    }else{
        $Name = $data->name;
    }
    if(empty($error)){
        $result = conn()->query("SELECT * FROM `payment_types` WHERE `payment_name` = '".$Name."'");
        if($result->num_rows >0){
            $note = 'Payment already exist';
        }else{
            conn()->query("UPDATE  `payment_types` SET `payment_name` = '".$Name."' WHERE `ID`='".$data->id."'");
        }
    }else{
        $note = implode(', ', $error)." is required";
    }   
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>