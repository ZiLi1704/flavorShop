<?php
    include '../../database/connect.php';
    $data = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($data->name)){
        $error[] = 'New Payment';
    }else{
        $Name = $data->name;
    }
    if(empty($error)){
        $result = conn()->query("SELECT * FROM `payment_types` WHERE `payment_name` = '".$Name."'");
        if($result->num_rows >0){
            $note = 'Unit already exist';
        }else{
            conn()->query("INSERT INTO `payment_types` (`payment_name`) VALUES ('".$Name."')");
        }
    }else{
        $note = implode(', ', $error)." is required";
    }   
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>