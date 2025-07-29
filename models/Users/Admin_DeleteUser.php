<?php
    include '../../database/connect.php';
    $user = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($user->ID)){
        $note = "Error When Deleting User";
    }else{
        conn()->query("DELETE FROM `users` WHERE `ID`='".$user->ID."'");
    }  
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>