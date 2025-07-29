<?php
    include '../../database/connect.php';
    $data = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($data->id)){
        $note[] = 'Error when deleting Unit';
    }else{
        $ID = $data->id;
    }
    if(empty($error)){
        conn()->query("DELETE FROM `units` WHERE `ID`='".$ID."'");
    }else{
        $note[] = 'Error when deleting Unit';
    }   
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>