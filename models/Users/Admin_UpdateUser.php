<?php
    include '../../database/connect.php';
    $user = json_decode(file_get_contents('php://input'));
    $note = "";
    if(empty($user->Role)){
        $error[] = 'Role';
    }else{
        $role = $user->Role;
    }
    if(empty($user->Fname)){
        $error[] = 'Full Name';
    }else{
        $Fname = $user->Fname;
    }
    if(empty($user->Email)){
        $error[] = 'Email';
    }else{
        $Email = $user->Email;
    }
    if(empty($user->Password)){
        $error[] = 'password';
    }else{
        $Password = md5($user->Password);
    }
    if(empty($user->Phone)){
        $error[] = 'Phone';
    }else{
        $Phone = $user->Phone;
    }
    if(empty($user->Address)){
        $error[] = 'Address';
    }else{
        $Address = $user->Address;
    }
    if(empty($error)){
        conn()->query("UPDATE `users` SET `user_Fname`='".$Fname."',`user_password`='".$Password."',
                    `user_email`='".$Email."',`user_phone`='".$Phone."',`user_address`='".$Address."',
                    `user_role`='".$role."' WHERE `ID`='".$user->ID."'");
    }else{
        $note = implode(', ', $error)." is required";
    }   
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>