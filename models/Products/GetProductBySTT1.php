<?php
    include '../../database/connect.php';
    $data = conn()->query("SELECT prd.id, prd.product_name, prd.product_desc, prd.product_price, prd.main_image, prd.image1, prd.image2, prd.image3, prd.image4, ui.unit_name 
    FROM products prd, units ui 
    WHERE prd.unit_id = ui.id AND prd.status = 'Best'
    ORDER BY RAND()
    LIMIT 9;");
    if($data->num_rows > 0) {
        while ($row = $data->fetch_assoc()) {
            $output[] = $row;
        }
    }
    echo json_encode($output);
?>