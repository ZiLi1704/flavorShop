<?php
    function conn(){
        $server = 'localhost';$name = 'root';$pass = '';$db='flavors';
        $conn = new mysqli("localhost","root","","flavors");
        if($conn->error){
            die('Errors'. $conn->error);
        }else{
            return $conn;
        }
    }
?>