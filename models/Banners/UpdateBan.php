<?php
    include '../../database/connect.php';
    $data=json_decode(file_get_contents("php://input"));
    $note = "";
    if(!empty($_FILES['image1']))
	{
        $image = time().date("dmY").'1'.'.png';
        // your Project file upload path
        move_uploaded_file($_FILES["image1"]["tmp_name"], "../../assets/images/banner/".$image);
        //echo "Image uploaded successfully as ".$image.$image2.$image3;
        conn()->query("UPDATE `banners` SET `banner_name`='".$image."' WHERE `ID`='".$_POST['id']."'");
	}
	else
	{
		$note = "Image Is Empty";
	}


    $output = array(
        'error' => $note,
    );
    echo json_encode($output);
?>