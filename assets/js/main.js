var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./pages/home.html",
      controller: "HomeController",
    })

    .when("/product", {
      templateUrl: "./pages/product.html",
      controller: "ProductController",
    })

    .when("/gallery", {
      templateUrl: "./pages/gallery.html",
      controller: "GalleryController",
    })

    .when("/sitemap", {
      templateUrl: "./pages/sitemap.html",
      controller: "SitemapController",
    })

    .when("/contact", {
      templateUrl: "./pages/contact.html",
      controller: "ContactController",
    })

    .when("/about", {
      templateUrl: "./pages/about.html",
      controller: "AboutController",
    })

    .when("/detail", {
      templateUrl: "./pages/detail.html",
      controller: "DetailController",
    })

    .when("/register", {
      templateUrl: "./pages/register.html",
      controller: "DetailController",
    })

    .when("/login", {
      templateUrl: "./pages/login.html",
      controller: "DetailController",
    });

});

app.controller("HomeController", function ($scope, $http) {
  init()
  
  function init() {
    $http.get("data/cars.json").then(function (response) {
      $scope.carList = response.data;
    });
  }
});

app.controller("ProductController", function ($scope, $rootScope, $http) {
  $scope.rangePrice = "10000-200000"
  $scope.modelList = []
  $scope.bodyStyleList = []

  init()
  
  function init() {
    $http.get("data/brands.json").then(function (response) {
      $scope.brandList = response.data;
    });

    $http.get("data/models.json").then(function (response) {
      $scope.modelList = response.data;
    });

    $http.get("data/cars.json").then(function (response) {

      $scope.carList = response.data;

      $scope.carList.forEach(car => {
        /*//modelList
        if(!$scope.modelList.includes(car.model))
          $scope.modelList.push(car.model)*/

        //bodyStyleList
        if(!$scope.bodyStyleList.includes(car.body_style))
          $scope.bodyStyleList.push(car.body_style)
      })

    });

    $scope.filterByPrice = function(rangePrice){
      if(rangePrice.length == 0) return function(item) { return true }
      
      let prices = rangePrice.split('-')
      let min = Number(prices[0])
      let max = Number(prices[1])

      return function(item){
        return item.price >= min && item.price <= max
      }
    }

    $scope.filterByBrandAndModel = function(){
      let key = $rootScope.key
      if(key.length == 0) return function(item) { return true }

      return function(item){
        let isBrand = false
        for(let i=0; i < $scope.brandList.length; i++){
          if($scope.brandList[i].name.toLowerCase().startsWith(key.toLowerCase())){
            isBrand = true
            break;
          }
        }

        return item.model.toLowerCase().startsWith(key.toLowerCase()) || isBrand
      }
    }
  }
});

app.controller("DetailController", function ($scope, $http) {});

app.controller("HeaderController", function ($scope, $rootScope) {
  $rootScope.key = ""
});


app.controller("GalleryController", function ($scope, $http) {
  init()

  function init(){
    $http.get("data/cars.json").then(function (response) {
      $scope.carList = response.data;

      /*$scope.getImageStyle = function(galleryImg) {
        return {
          left: Math.random() * 90 + 'vw', // Adjust these values to fit your layout
          top: Math.random() * 90 + 'vh',
        }
      }*/

      $scope.getImageStyle = function() {
        return {
          left: getRandomPosition(),
          top: getRandomPosition(),
        };
      };
    
      function getRandomPosition() {
        return Math.random() * 80 + 'vw'; // Adjust these values to fit your layout
      }


    })
  }
});


function nowDateTime() {
  var nowDate = new Date();
  var day = nowDate.getDate();
  var month = nowDate.getMonth() + 1;
  var year = nowDate.getFullYear();
  var hour = nowDate.getHours();
  var min = nowDate.getMinutes();
  var sec = nowDate.getSeconds();
  var dateTime = " Time: " + hour + ":" + min + ":" + sec + " -- To day is: " + day + " - " + month + " - " + year;
  document.getElementById("hvn").innerHTML = dateTime;
  navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var log = position.coords.longitude;

      // hiển thị vị trí
      var location = "     --  Your location: " + "Latitude: " + lat + " Longitude: " + log;
      document.getElementById("gps").innerHTML = location;
  });
}
setInterval(nowDateTime, 1000);


/*
function countVisitors() {
  if (localStorage.getItem("count") !== null) {
      var count = parseInt(localStorage.getItem("count"));
  } else {
      var count = 0;
  }
  count++;
  localStorage.setItem("count", count);
  document.getElementById("count").textContent = count;
}
countVisitors();*/

document.addEventListener('DOMContentLoaded', function() {
  let visitorCount = localStorage.getItem('visitorCount');
  
  if (!visitorCount) {
      visitorCount = 1;
  } else {
      visitorCount = parseInt(visitorCount) + 1;
  }
  
  document.getElementById('visitorCount').textContent = visitorCount;
  localStorage.setItem('visitorCount', visitorCount);
});
