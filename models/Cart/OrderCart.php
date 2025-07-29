<?php
include '../../database/connect.php';

$cart = json_decode(file_get_contents('php://input'));
$userID = $cart->userID;
$total = $cart->total;
$address = $cart->address; 
$pay = $cart->pay;
// Tạo kết nối
$conn = conn();

// Bắt đầu một giao dịch
$conn->begin_transaction();

try {
    $deleteUserAddress = $conn->prepare("DELETE FROM user_address WHERE user_id = ?");
    $deleteUserAddress->bind_param("s", $userID);
    $deleteUserAddress->execute();

    $insertUserAddress = $conn->prepare("INSERT INTO user_address (`user_id`, `address`) VALUES (?, ?)");
    $insertUserAddress->bind_param("ss", $userID, $address);
    $insertUserAddress->execute();
    // Thêm thông tin đơn hàng vào bảng order_dt
    $insertOrderDt = $conn->prepare("INSERT INTO `order_dt`(`user_id`, `total`, `payment_id`, `status`) VALUES (?, ?, ?, 'unconfirmed')");
    $insertOrderDt->bind_param("sds", $userID, $total, $pay);
    $insertOrderDt->execute();

    // Lấy ID của đơn hàng vừa thêm
    $orderID = $conn->insert_id;

    // Thêm các sản phẩm từ giỏ hàng vào bảng order_it
    $insertOrderIt = $conn->prepare("INSERT INTO order_it (od_id, product_id, quantity) SELECT ?, Prd_id, quantity FROM shopping_ss WHERE user_id = ?");
    $insertOrderIt->bind_param("ss", $orderID, $userID);
    $insertOrderIt->execute();

    // Xóa các sản phẩm đã đặt hàng khỏi bảng shopping_ss
    $deleteShopping = $conn->prepare("DELETE FROM shopping_ss WHERE user_id = ?");
    $deleteShopping->bind_param("s", $userID);
    $deleteShopping->execute();

    // Commit giao dịch nếu mọi thứ thành công
    $conn->commit();

    echo "Đơn hàng đã được đặt thành công.";
} catch (Exception $e) {
    
}

// Đóng kết nối
$conn->close();
?>