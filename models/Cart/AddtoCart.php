<?php
    include '../../database/connect.php';
    $cart = json_decode(file_get_contents('php://input'));
    if(empty($cart->UserID)){
        $note = "Login first"; 
    }else{
        $prd = $cart->PrdID;
        $user = $cart->UserID;
    }
    if(empty($note)){
        $data = conn()->query("SELECT * FROM `shopping_ss` WHERE `user_id`= '".$user."' AND `Prd_id` = '".$prd."'");
        if($data->num_rows>0){
            conn()->query("UPDATE `shopping_ss` SET `quantity`= `quantity`+1 WHERE `user_id`= '".$user."' AND `Prd_id` = '".$prd."'");
        }else{
            conn()->query("INSERT INTO `shopping_ss`(`user_id`, `Prd_id`, `quantity`) VALUES ('".$user."','".$prd."','1')");
        }
        $note ="";
    }
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>