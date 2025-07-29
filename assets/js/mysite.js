setInterval(() => {
    const date = new Date();
    document.querySelector("#date").textContent = date.toLocaleDateString();
    document.querySelector("#time").textContent = date.toLocaleTimeString();
}, 1000); // Update the ticker every 1 second.

function getLocation() {
    // Kiểm tra xem Geolocation có được hỗ trợ không
    if (navigator.geolocation) {
      // Yêu cầu trình duyệt lấy vị trí hiện tại của người dùng
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // Geolocation không được hỗ trợ
      console.log("Geolocation không được hỗ trợ");
    }
  }

  function showPosition(position) {
    // Lấy giá trị longitude và latitude
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    // Hiển thị giá trị longitude và latitude
    document.getElementById("longitude").innerHTML = longitude;
    document.getElementById("latitude").innerHTML = latitude;
  }

  // Gọi hàm getLocation() khi trang được tải
  window.onload = getLocation;