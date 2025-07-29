<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <!-- dsad -->
  <link rel="stylesheet" href="./assets/css/mysite.css" />
  <link rel="stylesheet" href="./assets/css/style.css" />
  <link rel="stylesheet" href="./assets/css/tung.css" />
  <link rel="stylesheet" href="./assets/css/trang.css" />
  <link rel="stylesheet" href="./assets/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="./assets/Font-Awesome-640/css/all.css">
</head>

<body ng-app="myApp" ng-controller="MainController">
  <div ng-switch="SWrole()">
    <div ng-switch-when="User" onload="getLocation()">
      <div class="superNav border-bottom py-2">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 centerOnMobile">
              <a class="navbar-brand" href="#">
                <h1>FLAVORS</h1>
              </a>
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block d-md-block-d-sm-block d-xs-none text-end">
              <h6>Visitor: {{visitorCount}}</h6>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
        <div class="container">
          <div class="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav me-auto"> <!-- Thay "ms-auto" bằng "me-auto" để menu từ trái sang phải -->
              <li class="nav-item dropdown"> <!-- Thêm class "dropdown" -->
                <a class="nav-link dropdown-toggle mx-2 text-uppercase" href="#" id="navbarDropdown" role="button"
                  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Category
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown"> <!-- Thêm class "dropdown-menu" -->
                  <li ng-repeat="cate in cates">
                    <a class="dropdown-item"  ng-click="getcat($index)
                    " href="#!/shop">{{cate.category_name}}</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-uppercase active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-uppercase" href="#!/contact">Contact</a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-uppercase" href="#!/about">About</a>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link mx-2 text-uppercase" href="#!/login">
                  <i class="fa-solid fa-circle-user me-1"></i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-uppercase" href="#!/cart">
                  <i class="fa-solid fa-cart-shopping me-1"> {{quantity}}</i>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mx-2 text-uppercase" href="#!" ng-click="DeleteSS()">
                  <i class="fa-solid fa-right-from-bracket me-1"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div ng-view></div>

      <footer id="footer">
        <!-- footer -->
        <div class="footer-content">
          <div class="container">
            <div class="row footer-information">
              <div class="col flex footer-intro">
                <h5 class="footer-intro_heading">ABOUT EDGES STORE</h5>
                <p class="footer-intro_content">
                  Felis eget nunc lobortis mattis aliquam faucibus purus in massa,
                  aucibus ornare viverra tellus lorem sit.
                </p>
              </div>

              <div class="col flex footer-contact">
                <h5 class="footer-contact_heading">ABOUT EDGES STORE</h5>
                <p class="footer-contact_address">
                  Yen Khe , Xa Yen Thuong, Huyen Gia Lam , Thanh Pho Ha Noi.
                </p>
                <a href="tel:+9348783491" class="footer-contact_phone">+9348783491</a>
                <a href="mailto:nguyenthanhtung21011998@gmmmail.com"
                  class="footer-contact_gmail">nguyenthanhtung21011998@gmail.com</a>
                <a href="#" class="footer-contact_map">SHOW ON MAP</a>
              </div>

              <div class="col flex footer-links">
                <h5 class="footer-links_heading">USEFUL LINKS</h5>
                <a href="#!/about" class="underline footer-link_1">About us</a>
                <a href="#" class="underline footer-link_2">Services</a>
                <a href="#!/contact" class="underline footer-link_3">FAQs</a>
                <a href="#!/shop" class="underline footer-link_4">Products</a>
                <a href="#" class="underline footer-link_5">Latest news</a>
              </div>

              <div class="col flex footer-working">
                <h5 class="footer-working_heading">STORE OPENING HOURS</h5>
                <div class="footer-working_list">
                  <div class="footer-working_workday">
                    <span>Mon - Fri</span>
                    <p>09:00 - 20:00 hrs</p>
                  </div>
                  <div class="footer-working_saturday">
                    <span>Saturday</span>
                    <p>09:00 - 18:00 hrs</p>
                  </div>
                  <div class="footer-working_sunday">
                    <span>Sunday</span>
                    <p>09:00 - 15:00 hrs</p>
                  </div>
                </div>
                <div class="footer-working_icons">
                  <a href="#"><i class="fa-brands fa-cc-visa"></i> </a>
                  <a href="#"><i class="fa-brands fa-cc-paypal"></i> </a>
                  <a href="#"><i class="fa-brands fa-cc-mastercard"></i> </a>
                  <a href="#"><i class="fa-brands fa-cc-stripe"></i> </a>
                </div>
              </div>
            </div>
            <div class="last-container">
        <ul>
          <li>Date: <span id="date"></span></li>

          <li>Time: <span id="time"></span></li>

          <li>latitude: <span id="latitude"></span></li>
          <li>longitude: <span id="longitude"></span></li>
        </ul>
      </div>
          </div>
      </footer>
      
    </div>
    <div ng-switch-when="Admin" class="AdminPage">
      <div class="sidebar">
        <div class="logo"></div>
        <ul class="menu">
          <li>
            <a href="#!/admin">
              <i class="fa-solid fa-gauge"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#!/admin/Users">
              <i class="fa-solid fa-user"></i>
              <span>Users</span>
            </a>
          </li>
          <li>
            <a href="#!/admin/Products">
              <i class="fa-solid fa-box"></i>
              <span>Products</span>
            </a>
          </li>
          <li class="logout">
            <a href="" ng-click="DeleteSS()">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="main">
        <div ng-view></div>
      </div>
    </div>
  </div>
  <script src="./assets/bootstrap/js/bootstrap.js"></script>
  <script src="./assets/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="./assets/js/mysite.js"></script>
  <script src="./assets/js/jquery-3.7.1.min.js"></script>
  <script src="./angular-1.8.2/angular.js"></script>
  <script src="./angular-1.8.2/angular-route.js"></script>
  <script src="./controllers/controller.js"></script>
</body>

</html>