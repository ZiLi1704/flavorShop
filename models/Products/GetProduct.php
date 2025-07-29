<?php
    include '../../database/connect.php';
    $data = conn()->query("SELECT pd.id, ca.category_name, pd.product_name, pd.product_desc, pd.product_price, pd.main_image, pd.image1, pd.image2, pd.image3, pd.image4, pd.status, pd.brand, pd.quantity, ui.unit_name  FROM `products` pd, `units` ui, `categories` ca WHERE pd.unit_id = ui.ID AND pd.cate_id = ca.ID ");
    $output = array(); // Khởi tạo một mảng rỗng
    if($data->num_rows > 0) {
        while ($row = $data->fetch_assoc()) {
            $output[] = $row;
        }
    }
    echo json_encode($output);
?>