<?php
    include '../../database/connect.php';
    $data = json_decode(file_get_contents('php://input'));
    if(empty($_POST['cate'])){
        $error[] = 'Category';
    }else{
        $Cate = $_POST['cate'];
    }
    if(empty($_POST['name'])){
        $error[] = 'Product Name';
    }else{
        $Name = $_POST['name'];
    }
    if(empty($_POST['brand'])){
        $error[] = 'Brand';
    }else{
        $Brand = $_POST['brand'];
    }
    if(empty($_POST['price'])){
        $error[] = 'Price';
    }else{
        $Price = $_POST['price'];
    }
    if(empty($_POST['unit'])){
        $error[] = 'Unit';
    }else{
        $Unit = $_POST['unit'];
    }
    if(empty($_POST['desc'])){
        $error[] = 'Description';
    }else{
        $Desc = $_POST['desc'];
    }
    if(empty($_POST['status'])){
        $error[] = 'Status';
    }else{
        $Stt = $_POST['status'];
    }
    if(empty($error)){
        if(!empty($_FILES['image'])&&!empty($_FILES['image1'])&&!empty($_FILES['image2'])&&!empty($_FILES['image3'])&&!empty($_FILES['image4'])){
            $result = conn()->query("SELECT * FROM `products` WHERE `product_name` = '".$Name."' AND `brand` = '".$Brand."'");
            if($result->num_rows > 0){
                $note = "Products that already exist";
            }else{
                $image  = time().date("dmY").'0'.'.png';
                $image1 = time().date("dmY").'1'.'.png';
                $image2 = time().date("dmY").'2'.'.png';
                $image3 = time().date("dmY").'3'.'.png';
                $image4 = time().date("dmY").'4'.'.png';
                // Chạy truy vấn INSERT
                $sql = "INSERT INTO `products`(`cate_id`, `product_name`, `product_desc`, `product_price`, `main_image`, `image1`, `image2`, `image3`, `image4`, `status`, `brand`, `unit_id`) 
                VALUES ('".$Cate."','".$Name."','".$Desc."','".$Price."','".$image."','".$image1."','".$image2."','".$image3."','".$image4."','".$Stt."','".$Brand."','".$Unit."')";

                if (conn()->query($sql) === TRUE) {
                    // Truy vấn INSERT thành công, tiến hành di chuyển các tệp ảnh
                    move_uploaded_file($_FILES["image"]["tmp_name"],"../../assets/images/product/".$image);
                    move_uploaded_file($_FILES["image1"]["tmp_name"],"../../assets/images/product/".$image1);
                    move_uploaded_file($_FILES["image2"]["tmp_name"],"../../assets/images/product/".$image2);
                    move_uploaded_file($_FILES["image3"]["tmp_name"],"../../assets/images/product/".$image3);
                    move_uploaded_file($_FILES["image4"]["tmp_name"],"../../assets/images/product/".$image4);
                } else {
                    $error[] = 'SQL error: ' . $sql . "<br>" . conn()->error;
                }
                $note = "";
            }
        } else {
            $error[] = 'All Images';
        }
    } else {
        $error[] = 'Fill and Add';
    }
    $note = implode(', ', $error)." is required"; 
    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>