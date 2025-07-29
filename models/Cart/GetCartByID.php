<?php
    include '../../database/connect.php';
    $cart = json_decode(file_get_contents('php://input'));
    $data = conn()->query("SELECT ss.id, ss.Prd_id, prd.product_name, prd.main_image, ss.quantity, prd.product_price FROM `shopping_ss` ss, `products` prd WHERE ss.Prd_id = prd.id AND ss.user_id = '".$cart->userID."'");
    if($data->num_rows >0){
        while($row = $data->fetch_assoc()){
            $arr[] = $row;
        }
    }
    echo json_encode($arr);
?>