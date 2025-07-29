<?php
    include '../../database/connect.php';
    $data = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($data->id)){
        $note[] = 'Error when deleting Discount';
    }else{
        $ID = $data->id;
    }
    if(empty($error)){
        conn()->query("DELETE FROM `discount` WHERE `id`='".$ID."'");
        
    }else{
        $note[] = 'Error when deleting Discount';
    }   
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>