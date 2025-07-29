<?php
    include '../database/connect.php';
    $user = json_decode(file_get_contents('php://input'));
    $note = "";
    $role = "";
    $uID = "";
    if(empty($user->Email)){
        $error[] = 'Email';
    }else{
        $useremail = $user->Email;
    }
    if(empty($user->Password)){
        $error[] = 'Password';
    }else{
        $password = md5($user->Password);
    }
    if(empty($error)){
        $result = conn()->query("SELECT * FROM users WHERE `user_email` = '".$useremail."' AND `user_password` = '".$password."'");
        if($result->num_rows >0){
            $row = $result->fetch_assoc();
            $role = $row['user_role'];
            $uID = $row['ID'];
        }else{
            $note = "wrong username or password";
        }
    }else{
        $note = implode(", ", $error)." is required";
    }
    $output = array(
        'error' => $note,
        'role' => $role,
        'UserID' => $uID
    );
    echo json_encode($output);
?>