var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/admin", {
      templateUrl: "./views/admin/Dashboard.html",
      controller: "DashboardController",
    })
    .when("/admin/Users", {
      templateUrl: "./views/admin/UserList.html",
      controller: "UserListController",
    })
    .when("/admin/Products", {
      templateUrl: "./views/admin/ProductList.html",
      controller: "ProductListController",
    })
    .when("/", {
      templateUrl: "./views/Home.html",
      controller: "HomeController",
    })
    .when("/about", {
      templateUrl: "./views/About.html",
      controller: "AboutController",
    })
    .when("/contact", {
      templateUrl: "./views/Contact.html",
      controller: "ContactController",
    })
    .when("/shop", {
      templateUrl: "./views/Shop.html",
      controller: "ShopController",
    })
    .when("/login", {
      templateUrl: "./views/Login.html",
      controller: "LoginNRegistController",
    })
    .when("/cart", {
      templateUrl: "./views/cart.html",
      controller: "CartController",
    })
    .when("/checkout", {
      templateUrl: "./views/checkout.html",
      controller: "CheckOutController",
    })
    .when("/404", {
      templateUrl: "./views/Error.html",
      controller: "ErrorController",
    })
    .otherwise({
      redirectTo: "/404",
    });
});

app.controller("DashboardController", function ($scope, $http) {
  $scope.changeSwitch = function (value) {
    $scope.currentSwitch = value;
  };
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Banners/GetBanner.php",
  }).then(function (res) {
    $scope.banners = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Units/GetUnit.php",
  }).then(function (res) {
    $scope.units = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Payments/GetPay.php",
  }).then(function (res) {
    $scope.payments = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Categories/GetCate.php",
  }).then(function (res) {
    $scope.cates = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Discounts/GetDis.php",
  }).then(function (res) {
    $scope.Discounts = res.data;
  });
  $scope.clear = function () {
    $scope.Cat = {
      name: "",
    };
    $scope.Unit = {
      name: "",
    };
    $scope.Pay = {
      name: "",
    };
    $scope.Dis = {
      name: "",
      per: 0,
    };
    $scope.notetext = true;
    $scope.noteres = false;
  };
  // Banner
  $scope.Banid = 1;
  $scope.form = [];
  $scope.files = [];
  $scope.clearFields = function () {
    $scope.image1 = "No file chosen";
    document.getElementById("output").src = "";
  };
  $scope.GetBanByIndex = function ($index) {
    $scope.Banid = $scope.banners[$index].ID;
    $scope.clearFields();
  };
  $scope.btnEditBan = function () {
    $scope.image1 = $scope.files[0];
    var formData = new FormData();
    formData.append("id", $scope.Banid);
    formData.append("image1", $scope.image1);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Banners/UpdateBan.php",
      data: formData,
      headers: {
        "Content-Type": undefined,
      },
      transformRequest: angular.identity,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Update Banner Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Banners/GetBanner.php",
        }).then(function (res) {
          $scope.banners = res.data;
        });
        $scope.image1 = "";
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.uploadedFile = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var output = document.getElementById("output");
      output.src = URL.createObjectURL(element.files[0]);

      $scope.image_source = event.target.result;
      $scope.$apply(function ($scope) {
        $scope.files = element.files;
      });
    };
    reader.readAsDataURL(element.files[0]);
  };
  // !Banner

  // Discount
  $scope.Disid = 1;
  $scope.GetDisByIndex = function ($index) {
    ($scope.Disid = $scope.Discounts[$index].id),
      ($scope.txtDisname = $scope.Discounts[$index].name);
  };
  $scope.btnAddDis = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Discounts/CreateDis.php",
      data: $scope.Dis,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Add Discount Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Discounts/GetDis.php",
        }).then(function (res) {
          $scope.Discounts = res.data;
        });
        $scope.Dis = {
          name: "",
          per: "",
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnDelDis = function () {
    $scope.Dis = {
      id: $scope.Disid,
    };
    console.log($scope.Dis);
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Discounts/DelDis.php",
      data: $scope.Dis,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Delete Discount Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Discounts/GetDis.php",
        }).then(function (res) {
          $scope.Discounts = res.data;
        });
        $scope.Dis = {
          id: "",
          name: "",
          per: 0,
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  // !Discount

  // Category
  $scope.GetCateByIndex = function ($index) {
    $scope.Cat = {
      id: $scope.cates[$index].ID,
      name: $scope.cates[$index].category_name,
    };
  };
  $scope.btnAddCat = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Categories/CreateCate.php",
      data: $scope.Cat,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Add Category Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Categories/GetCate.php",
        }).then(function (res) {
          $scope.cates = res.data;
        });
        $scope.Cat = {
          name: "",
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnEditCat = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Categories/UpdateCate.php",
      data: $scope.Cat,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Update Category Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Categories/GetCate.php",
        }).then(function (res) {
          $scope.cates = res.data;
        });
        $scope.Cat = {
          id: "",
          name: "",
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnDelCat = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Categories/DelCate.php",
      data: $scope.Cat,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Delete Category Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Categories/GetCate.php",
        }).then(function (res) {
          $scope.cates = res.data;
        });
        $scope.Cat = {
          id: "",
          name: "",
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  // !Category

  // Unit
  $scope.GetUnitByIndex = function ($index) {
    $scope.Unit = {
      id: $scope.units[$index].ID,
      name: $scope.units[$index].unit_name,
    };
  };
  $scope.btnAddUnit = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Units/CreateUnit.php",
      data: $scope.Unit,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Add unit Success.";
        $scope.Unit = {
          id: "",
          name: "",
        };
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Units/GetUnit.php",
        }).then(function (res) {
          $scope.units = res.data;
        });
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnEditUnit = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Units/UpdateUnit.php",
      data: $scope.Unit,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Update Unit Success.";
        $scope.Unit = {
          id: "",
          name: "",
        };
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Units/GetUnit.php",
        }).then(function (res) {
          $scope.units = res.data;
        });
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnDelUnit = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Units/DelUnit.php",
      data: $scope.Unit,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Delete Unit Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Units/GetUnit.php",
        }).then(function (res) {
          $scope.units = res.data;
        });
        $scope.Unit = {
          id: "",
          name: "",
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  // !Unit

  // Payment
  $scope.GetPayByIndex = function ($index) {
    $scope.Pay = {
      id: $scope.payments[$index].ID,
      name: $scope.payments[$index].payment_name,
    };
  };
  $scope.btnAddPay = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Payments/CreatePay.php",
      data: $scope.Pay,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Add New Payment Success.";
        $scope.Pay = {
          id: "",
          name: "",
        };
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Payments/GetPay.php",
        }).then(function (res) {
          $scope.payments = res.data;
        });
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnEditPay = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Payments/UpdatePay.php",
      data: $scope.Pay,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Update Payment Success.";
        $scope.Pay = {
          id: "",
          name: "",
        };
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Payments/GetPay.php",
        }).then(function (res) {
          $scope.payments = res.data;
        });
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.btnDelPay = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Payments/DelPay.php",
      data: $scope.Pay,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Delete Payment Success.";
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Payments/GetPay.php",
        }).then(function (res) {
          $scope.payments = res.data;
        });
        $scope.Pay = {
          id: "",
          name: "",
        };
      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  // !Payment
});
app.controller("UserListController", function ($scope, $http) {
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Users/Admin_UserList.php",
  }).then(function (res) {
    $scope.UserList = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Roles/Admin_RoleList.php",
  }).then(function (res) {
    $scope.RoleList = res.data;
  });
  $scope.clear = function () {
    $scope.User = {
      Fname: "",
      Email: "",
      Password: "",
      Phone: "",
      Address: "",
    };
    $scope.notetext = true;
    $scope.noteres = false;
  };
  $scope.getUserByIndex = function ($index) {
    $scope.role_name = $scope.UserList[$index].role_name;
    $scope.user_Fname = $scope.UserList[$index].user_Fname;
    $scope.user_email = $scope.UserList[$index].user_email;
    $scope.user_password = $scope.UserList[$index].user_password;
    $scope.user_phone = $scope.UserList[$index].user_phone;
    $scope.user_address = $scope.UserList[$index].user_address;
    $scope.User = {
      Fname: $scope.user_Fname,
      Email: $scope.user_email,
      Password: $scope.user_password,
      Phone: $scope.user_phone,
      Address: $scope.user_address,
    };
    $scope.User.ID = $scope.UserList[$index].ID;
    $scope.notetext = true;
    $scope.noteres = false;
  };
  $scope.AddUser = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Users/Admin_CreateUser.php",
      data: $scope.User,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.notetext = false;
        $scope.noteres = true;
        $scope.note = res.data.error;
      } else {
        $scope.note = "Add User Success.";
        $scope.notetext = false;
        $scope.noteres = true;
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Users/Admin_UserList.php",
        }).then(function (res) {
          $scope.UserList = res.data;
        });
        $scope.User = {
          Fname: "",
          Email: "",
          Password: "",
          Phone: "",
          Address: "",
        };
      }
    });
  };
  $scope.FixUser = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Users/Admin_UpdateUser.php",
      data: $scope.User,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
        $scope.notetext = false;
        $scope.noteres = true;
      } else {
        $scope.note = "Update User Success.";
        $scope.notetext = false;
        $scope.noteres = true;
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Users/Admin_UserList.php",
        }).then(function (res) {
          $scope.UserList = res.data;
        });
        $scope.User = {
          Fname: "",
          Email: "",
          Password: "",
          Phone: "",
          Address: "",
        };
      }
    });
  };
  $scope.DelUser = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Users/Admin_DeleteUser.php",
      data: $scope.User,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Delete User Success.";
        $scope.notetext = false;
        $scope.noteres = true;
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Users/Admin_UserList.php",
        }).then(function (res) {
          $scope.UserList = res.data;
        });
        $scope.User = "";
        $scope.role_name = "";
        $scope.user_Fname = "";
        $scope.user_email = "";
        $scope.user_password = "";
        $scope.user_phone = "";
        $scope.user_address = "";
      }
    });
  };
});
app.controller("ProductListController", function ($scope, $http, $window) {
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Products/GetProduct.php",
  }).then(function (res) {
    $scope.Products = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Categories/GetCate.php",
  }).then(function (res) {
    $scope.cates = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Units/GetUnit.php",
  }).then(function (res) {
    $scope.units = res.data;
    console.log(res.data);
  });$scope.prdID =1;
  $scope.GetProductByIndex = function ($index) {
    $scope.prdID = $scope.Products[$index].id;
    $scope.img1 = $scope.Products[$index].image1;
    $scope.img2 = $scope.Products[$index].image2;
    $scope.img3 = $scope.Products[$index].image3;
    $scope.img4 = $scope.Products[$index].image4;
    $scope.txtName = $scope.Products[$index].product_name;
    $scope.txtCate = $scope.Products[$index].category_name;
    $scope.txtRealPrice = $scope.Products[$index].product_price;
    $scope.txtUnit = $scope.Products[$index].unit_name;
    $scope.txtDesc = $scope.Products[$index].product_desc;
  };
  $scope.Delproduct = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Products/DelProduct.php",
      data: { id: $scope.prdID},
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.note = "Delete Product Success.";
        $scope.notetext = false;
        $scope.noteres = true;
        $http({
          method: "GET",
          url: "/demo_FLAVORS/models/Products/GetProduct.php",
        }).then(function (res) {
          $scope.Products = res.data;
        });
      }
    });
  };
  $scope.Banid = 1;
  $scope.form = [];
  $scope.files = [];
  $scope.clear = function () {
    $scope.image = "No file chosen";
    $scope.image1 = "No file chosen";
    $scope.image2 = "No file chosen";
    $scope.image3 = "No file chosen";
    $scope.image4 = "No file chosen";
    document.getElementById("output").src = "";
    document.getElementById("output1").src = "";
    document.getElementById("output2").src = "";
    document.getElementById("output3").src = "";
    document.getElementById("output4").src = "";
  };
  $scope.GetBanByIndex = function ($index) {
    $scope.Banid = $scope.Products[$index].ID;
    $scope.clearFields();
  };
  $scope.Addproduct = function () {
    $scope.Prdimage = $scope.files[0];
    $scope.Prdimage1 = $scope.files1[0];
    $scope.Prdimage2 = $scope.files2[0];
    $scope.Prdimage3 = $scope.files3[0];
    $scope.Prdimage4 = $scope.files4[0];
    var formData = new FormData();
    formData.append("image", $scope.Prdimage);
    formData.append("image1", $scope.Prdimage1);
    formData.append("image2", $scope.Prdimage2);
    formData.append("image3", $scope.Prdimage3);
    formData.append("image4", $scope.Prdimage4);
    formData.append("cate", $scope.PrdCate);
    formData.append("name", $scope.PrdName);
    formData.append("brand", $scope.PrdBrand);
    formData.append("price", $scope.PrdPrice);
    formData.append("unit", $scope.PrdUnit);
    formData.append("desc", $scope.PrdDesc);
    formData.append("status", $scope.PrdStt);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Products/CreateProduct.php",
      data: formData,
      headers: {
        "Content-Type": undefined,
      },
      transformRequest: angular.identity,
    }).then(function (res) {
      if (res.data.error != "") {
        console.log(res.data.error);
        $scope.note = res.data.error;
      } else {

      }
    });
    $scope.notetext = false;
    $scope.noteres = true;
  };
  $scope.uploadedFile1 = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var output = document.getElementById("output1");
      output.src = URL.createObjectURL(element.files[0]);

      $scope.image_source = event.target.result;
      $scope.$apply(function ($scope) {
        $scope.files1 = element.files;
      });
    };
    reader.readAsDataURL(element.files[0]);
  };
  $scope.uploadedFile2 = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var output = document.getElementById("output2");
      output.src = URL.createObjectURL(element.files[0]);

      $scope.image_source = event.target.result;
      $scope.$apply(function ($scope) {
        $scope.files2 = element.files;
      });
    };
    reader.readAsDataURL(element.files[0]);
  };
  $scope.uploadedFile3 = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var output = document.getElementById("output3");
      output.src = URL.createObjectURL(element.files[0]);

      $scope.image_source = event.target.result;
      $scope.$apply(function ($scope) {
        $scope.files3 = element.files;
      });
    };
    reader.readAsDataURL(element.files[0]);
  };
  $scope.uploadedFile4 = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var output = document.getElementById("output4");
      output.src = URL.createObjectURL(element.files[0]);

      $scope.image_source = event.target.result;
      $scope.$apply(function ($scope) {
        $scope.files4 = element.files;
      });
    };
    reader.readAsDataURL(element.files[0]);
  };
  $scope.uploadedFile = function (element) {
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var output = document.getElementById("output");
      output.src = URL.createObjectURL(element.files[0]);

      $scope.image_source = event.target.result;
      $scope.$apply(function ($scope) {
        $scope.files = element.files;
      });
    };
    reader.readAsDataURL(element.files[0]);
  };
});
app.controller("MainController", function ($scope, $window, $http) {
  $scope.SWrole = function () {
    var key = $window.sessionStorage.getItem("role");
    switch (key) {
      case "1":
        return "Admin";
      case "3":
        return "User";
      default:
        return "User";
    }
  };
  $http({
    method: "GET",
    url: "./database/counter.php",
  }).then(function (response) {
    $scope.visitorCount = response.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Categories/GetCate.php",
  }).then(function (res) {
    $scope.cates = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Payments/GetPay.php",
  }).then(function (res) {
    $scope.payments = res.data;
  });
  $scope.Pay = '1';  

  $scope.DeleteSS = function () {
    $window.sessionStorage.setItem("role", "");
    $window.sessionStorage.setItem("UserID", "")
    $window.location.href = "http://localhost/demo_FLAVORS/";
  };
  $scope.txtID = "";
  $scope.notetext = true;
  $scope.noteres = false; 
  $scope.calculateTotalAndQuantity = function () {
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Cart/GetCartByID.php",
      data: { userID: $window.sessionStorage.getItem("UserID") },
    }).then(function (response) {
      $scope.Carts = response.data;
      $scope.total = 0;
      $scope.quantity = 0;
      for (var i = 0; i < $scope.Carts.length; i++) {
        $scope.total += $scope.Carts[i].product_price * $scope.Carts[i].quantity;
        $scope.quantity += Number($scope.Carts[i].quantity);
      }
    });
  };
  $scope.getcat = function (index) {
    $scope.checkName = $scope.cates[index].category_name;
    $scope.getCate = $scope.cates[index].ID;
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Products/GetProductByCate.php",
      data: { CateID: $scope.getCate},
    }).then(function (response) {
      $scope.Products = response.data;
      $scope.itemsPerPage = 6; // Number of products per page
      $scope.currentPage = 1; // Current page
      $scope.totalItems = $scope.Products.length;
      $scope.totalPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
      // Function to generate an array of page numbers for the pagination
      $scope.getPages = function () {
        var pages = [];
        for (var i = 1; i <= $scope.totalPages; i++) {
          pages.push(i);
        }
        return pages;
      };
      $scope.setCurrentPage = function (page) {
        $scope.currentPage = page;
      };
      function getRandomProducts(arr, count) {
        let shuffled = arr.slice(0);
        let i = arr.length;
        let min = i - count;
        let temp, index;
      
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
      
        return shuffled.slice(min);
      }
      $scope.ProductsSlide = getRandomProducts($scope.Products, 4);
    });
  };
  
  $scope.calculateTotalAndQuantity();
});
app.controller("HomeController", function ($scope, $http, $window) {
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Banner.php",
  }).then(function (res) {
    $scope.banner = res.data;
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Products/GetProductBySTT1.php",
  }).then(function (res) {
    $scope.best = res.data;
     // Số sản phẩm trên mỗi trang
    var itemsPerPage2 = 3;

    // Trang hiện tại
    $scope.currentPage2 = 0;

    // Sản phẩm hiện tại được hiển thị
    $scope.currentItems2 = [];
    // Ban đầu, hiển thị trang đầu tiên
    function updateCurrentItems2() {
      var startIndex = $scope.currentPage2 * itemsPerPage2;
      $scope.currentItems2 = $scope.best.slice(
        startIndex,
        startIndex + itemsPerPage2
      );
    }

    // Chuyển đến trang tiếp theo
    $scope.nextPage2 = function () {
      if (
        $scope.currentPage2 <
        Math.ceil($scope.best.length / itemsPerPage2) - 1
      ) {
        $scope.currentPage2++;
      } else {
        $scope.currentPage2 = 0; // Quay lại trang đầu tiên
      }
      updateCurrentItems2();
    };

    // Chuyển đến trang trước đó
    $scope.prevPage2 = function () {
      if ($scope.currentPage2 > 0) {
        $scope.currentPage2--;
      } else {
        $scope.currentPage2 = Math.ceil($scope.best.length / itemsPerPage2) - 1; // Quay lại trang cuối cùng
      }
      updateCurrentItems2();
    };

    // Ban đầu, hiển thị trang đầu tiên
    updateCurrentItems2();
    function getRandomProducts(arr, count) {
      let shuffled = arr.slice(0);
      let i = arr.length;
      let min = i - count;
      let temp, index;
    
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
    
      return shuffled.slice(min);
    }
    $scope.ProductsSlide = getRandomProducts($scope.best, 4);
  });
  $http({
    method: "GET",
    url: "/demo_FLAVORS/models/Products/GetProductBySTT2.php",
  }).then(function (res) {
    $scope.feature = res.data;
    // Số sản phẩm trên mỗi trang
    var itemsPerPage1 = 3;

    // Trang hiện tại
    $scope.currentPage1 = 0;

    // Sản phẩm hiện tại được hiển thị
    $scope.currentItems1 = [];
    updateCurrentItems1();
    // Hàm cập nhật sản phẩm hiển thị trên trang
    function updateCurrentItems1() {
      var startIndex = $scope.currentPage1 * itemsPerPage1;
      $scope.currentItems1 = $scope.feature.slice(
        startIndex,
        startIndex + itemsPerPage1
      );
    }

    // Chuyển đến trang tiếp theo
    $scope.nextPage1 = function () {
      if (
        $scope.currentPage1 <
        Math.ceil($scope.feature.length / itemsPerPage1) - 1
      ) {
        $scope.currentPage1++;
      } else {
        $scope.currentPage1 = 0; // Quay lại trang đầu tiên
      }
      updateCurrentItems1();
    };

    // Chuyển đến trang trước đó
    $scope.prevPage1 = function () {
      if ($scope.currentPage1 > 0) {
        $scope.currentPage1--;
      } else {
        $scope.currentPage1 =
          Math.ceil($scope.feature.length / itemsPerPage1) - 1; // Quay lại trang cuối cùng
      }
      updateCurrentItems1();
      function getRandomProducts(arr, count) {
        let shuffled = arr.slice(0);
        let i = arr.length;
        let min = i - count;
        let temp, index;
      
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
      
        return shuffled.slice(min);
      }
      $scope.ProductsSlide = getRandomProducts($scope.feature, 4);
    };
  });
  $scope.addToCart1 = function(index){
    $scope.PrdID = $scope.feature[index].id;
    $scope.UserID = $window.sessionStorage.getItem("UserID");
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Cart/AddtoCart.php",
      data: {PrdID: $scope.PrdID, UserID: $scope.UserID},
    }).then(function(res){
      if(res.data.error !=""){
        alert(res.data.error);
      }else{
        $scope.calculateTotalAndQuantity();
        alert("Add to cart success!");
      }
    })
  }
  $scope.addToCart2 = function(index){
    $scope.PrdID = $scope.best[index].id;
    $scope.UserID = $window.sessionStorage.getItem("UserID");
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Cart/AddtoCart.php",
      data: {PrdID: $scope.PrdID, UserID: $scope.UserID},
    }).then(function(res){
      if(res.data.error !=""){
        alert(res.data.error);
      }else{
        $scope.calculateTotalAndQuantity();
        alert("Add to cart success!");
      }
    })
  }
  $scope.GetData1 = function(index){
    $scope.takeID = index;
    $scope.img1 = $scope.currentItems1[index].image1;
    $scope.img2 = $scope.currentItems1[index].image2;
    $scope.img3 = $scope.currentItems1[index].image3;
    $scope.img4 = $scope.currentItems1[index].image4;
    $scope.txtName = $scope.currentItems1[index].product_name;
    $scope.txtRealPrice = $scope.currentItems1[index].product_price;
    $scope.txtUnit = $scope.currentItems1[index].unit_name;
    $scope.txtDesc = $scope.currentItems1[index].product_desc;
  }
  $scope.GetData2 = function(index){
    $scope.takeID = index;
    $scope.img1 = $scope.currentItems2[index].image1;
    $scope.img2 = $scope.currentItems2[index].image2;
    $scope.img3 = $scope.currentItems2[index].image3;
    $scope.img4 = $scope.currentItems2[index].image4;
    $scope.txtName = $scope.currentItems2[index].product_name;
    $scope.txtRealPrice = $scope.currentItems2[index].product_price;
    $scope.txtUnit = $scope.currentItems2[index].unit_name;
    $scope.txtDesc = $scope.currentItems2[index].product_desc;
  }

});

app.controller("CartController", function ($scope, $http, $window) {

 
});
app.controller("CheckOutController", function ($scope, $http, $window) {
  $scope.form_checkout =true;
  $scope.Order = function(){
    $scope.Checkout ={
      userID: $window.sessionStorage.getItem("UserID"), 
      total: $scope.total,
      address: $scope.Address,
      pay: $scope.Pay
    }
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Cart/OrderCart.php",
      data: $scope.Checkout,
    }).then(function (response) {
      console.log(response.data)
      $scope.calculateTotalAndQuantity();
      alert("Order success!");
    });
  }
});
app.controller("AboutController", function ($scope) {
  // controller logic for the about page
});

app.controller("ShopController", function ($scope, $window, $http) {
  $scope.addToCart = function(index){
    $scope.PrdID = $scope.Products[index].id;
    $scope.UserID = $window.sessionStorage.getItem("UserID");
    $http({
      method: "POST",
      url: "/demo_FLAVORS/models/Cart/AddtoCart.php",
      data: {PrdID: $scope.PrdID, UserID: $scope.UserID},
    }).then(function(res){
      if(res.data.error !=""){
        alert(res.data.error);
      }else{
        $scope.calculateTotalAndQuantity();
        alert("Add to cart success!");
      }
    })
  }
  $scope.GetData = function(index){
    $scope.takeID = index;
    $scope.img1 = $scope.Products[index].image1;
    $scope.img2 = $scope.Products[index].image2;
    $scope.img3 = $scope.Products[index].image3;
    $scope.img4 = $scope.Products[index].image4;
    $scope.txtName = $scope.Products[index].product_name;
    $scope.txtRealPrice = $scope.Products[index].product_price;
    $scope.txtUnit = $scope.Products[index].unit_name;
    $scope.txtDesc = $scope.Products[index].product_desc;
  }
});

app.controller("ContactController", function ($scope) {
  // controller logic for the about page
});

app.controller("ErrorController", function ($scope) {
  // controller logic for the about page
});

app.controller("LoginNRegistController", function ($scope, $http, $window) {
  $scope.note = "";
  $scope.frmLogin = true;
  $scope.frmRegist = false;
  $scope.frmReset = false;
  $scope.subLogin = function () {
    $http({
      method: "POST",
      url: "http://localhost/demo_FLAVORS/models/Login.php",
      data: $scope.user,
    }).then(function (res) {
      if (res.data.error != "") {
        $scope.note = res.data.error;
      } else {
        $scope.role = res.data.role;
        $scope.UsID = res.data.UserID;
        $window.sessionStorage.setItem("UserID", $scope.UsID);
        $window.sessionStorage.setItem("role", $scope.role);
        if ($window.sessionStorage.getItem("role") == 1) {
          $window.location.href = "http://localhost/demo_FLAVORS/#!/admin";
        } else {
          $window.location.href = "http://localhost/demo_FLAVORS/#!/";
          $scope.calculateTotalAndQuantity();
        }
      }
    });
  };
  $scope.subregis = function(){
    if($scope.txtPass == $scope.txtRePass){
      $http({
        method: "POST",
        url: "http://localhost/demo_FLAVORS/models/Users/Admin_CreateUser.php",
        data: {Fname: $scope.txtUser, Email: $scope.txtEmail, Phone: $scope.txtTelephone, Password: $scope.txtPass, repass: $scope.txtRePass, Role:3, Address:"Null"},
      }).then(function (res) {
        if (res.data.error != "") {
          $scope.note = res.data.error;
        } else {
          $scope.note = "create account success";
        }
      });
    }else{
      $scope.note = "password doesn't match";
    }
  }
  $scope.goRegist = function () {
    $scope.frmLogin = false;
    $scope.frmRegist = true;
    $scope.frmReset = false;
  };
  $scope.goLogin = function () {
    $scope.frmLogin = true;
    $scope.frmRegist = false;
    $scope.frmReset = false;
  };
  $scope.goReset = function () {
    $scope.frmLogin = false;
    $scope.frmRegist = false;
    $scope.frmReset = true;
  };
});
