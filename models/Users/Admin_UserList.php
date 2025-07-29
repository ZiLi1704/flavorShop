<?php
    include '../../database/connect.php';
    $data = conn()->query("SELECT us.ID, us.user_Fname, us.user_email, us.user_password, us.user_phone, us.user_address, rl.role_name FROM `users` us, `roles` rl WHERE rl.ID = us.user_role");
    if($data->num_rows >0){
        while($row = $data->fetch_assoc()){
            $output[] = $row;
        }
    }
    echo json_encode($output);
?>