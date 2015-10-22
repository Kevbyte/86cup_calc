angular.module('86cup.profile', [])
  .controller('ProfileController', function ($scope, $window, $location, $window, Racers) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/')
    }
    var user = $window.localStorage.username.toLowerCase();
    $scope.username = {name: user};
    $scope.modPts = 0;
    $scope.modList = {};
    $scope.class;
    $scope.avatar = "../assets/car-placeholder.png";
    
    //fetch a user's information from db
    $scope.getModList = function() {
      //fetch user modlist data
      console.log('username === ', $scope.username);
      Racers.getModList($scope.username)
        .then(function(resp){
          console.log('resp === ', resp.data)
          // if(resp.data.avatar !== "../assets/car-placeholder.png") {
          //   $scope.avatar = resp.data.avatar; 
          // }
          $scope.avatar = resp.data.avatar;
          $scope.modList.mods = resp.data.modList;
          $scope.modPts = resp.data.modPts;
        })
        .then(function() {
          _.forEach($scope.modList.mods.drivetrain, function(mod, i) {
            if(mod.active === true) {
              setTimeout(function() {
                $('.'+i).prop('checked', 'checked')
              }, 10)
            }
          })
        })
        .then(function() {
          $scope.determineClass();
        })
    };

    if($window.localStorage.username !== 'admin') {
      console.log("not admin so go get mod list")
      $scope.getModList()
    }else{
      $scope.avatar = "../assets/zeus.jpg";
      alert("You are currently in admin mode. Only regular users can set a profile.");
    }
    

    //user clicks on mod and toggles it active/not active
    $scope.toggleActiveDrivetrain = function(i, e) {
      if($scope.modList.mods.drivetrain[i].active === false) {
        $scope.modPts += $scope.modList.mods.drivetrain[i].value;
        console.log($scope.modPts);
      }else{
        $scope.modPts -= $scope.modList.mods.drivetrain[i].value;
      }
      $scope.modList.mods.drivetrain[i].active = !$scope.modList.mods.drivetrain[i].active;
      $scope.determineClass();
    };

    $scope.toggleActiveWheels = function(i) {
      if($scope.modList.mods.wheels[i].active === false) {
        $scope.modPts += $scope.modList.mods.wheels[i].value;
        console.log($scope.modPts);
      }else{
        $scope.modPts -= $scope.modList.mods.wheels[i].value;
      }
      $scope.modList.mods.wheels[i].active = !$scope.modList.mods.wheels[i].active;
      $scope.determineClass();
    };

    $scope.toggleActiveAero = function(i) {
      if($scope.modList.mods.aero[i].active === false) {
        $scope.modPts += $scope.modList.mods.aero[i].value;
      }else{
        $scope.modPts -= $scope.modList.mods.aero[i].value;
      }
      $scope.modList.mods.aero[i].active = !$scope.modList.mods.aero[i].active;
      $scope.determineClass();
    };

    $scope.toggleActiveSuspension = function(i) {
      if($scope.modList.mods.suspension[i].active === false) {
        $scope.modPts += $scope.modList.mods.suspension[i].value;
      }else{
        $scope.modPts -= $scope.modList.mods.suspension[i].value;
      }
      $scope.modList.mods.suspension[i].active = !$scope.modList.mods.suspension[i].active;
      $scope.determineClass();
    };

    //A function to determine a user's class
    $scope.determineClass = function() {
      if($scope.modPts <= 0.5) {
        $scope.class = 'stock';
      }
      if($scope.modPts > 0.5 && $scope.modPts <= 4.0) {
        $scope.class = 'street';
      }
      if($scope.modPts > 4.0 && $scope.modPts <= 7.0) {
        $scope.class = 'limited';
      }
      if($scope.modPts > 7.0) {
        $scope.class = 'unlimited';
      }
      console.log($scope.class)
    };

    //upload a photo to be used as an avatar
    $scope.add = function() {
      var file = document.getElementById('file').files[0];
      // var preview = document.getElementById('pic');
      var fileType = file.type;
      var reader = new FileReader();

      reader.onloadend = function(e) {
        var image = new Image();
        image.src = reader.result;
        // preview.src = e.target.result;
        image.onload = function() {
          var maxWidth = 100,
              maxHeight = 75,
              imageWidth = image.width,
              imageHeight = image.height;

          if (imageWidth > imageHeight) {
            if (imageWidth > maxWidth) {
              imageHeight *= maxWidth / imageWidth;
              imageWidth = maxWidth;
            }
          }
          else {
            if (imageHeight > maxHeight) {
              imageWidth *= maxHeight / imageHeight;
              imageHeight = maxHeight;
            }
          }

          var canvas = document.createElement('canvas');
          canvas.width = imageWidth;
          canvas.height = imageHeight;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, imageWidth, imageHeight);

          // The resized file ready for upload
          var finalFile = canvas.toDataURL(fileType);
          console.log("finalFile === ", finalFile);
          $scope.avatar = finalFile;
        }
      }
    //   var dataurl = null;
    //   var preview = document.getElementById('pic');
    //   var f = document.getElementById('file').files[0];
    //   var img = document.createElement("img");

    //   var r = new FileReader();

    //   r.onloadend = function(e){
    //     preview.src = e.target.result;
    //     img.src = e.target.result;
    //       console.log("img", img)
    //       var canvas = document.createElement("canvas");
    //       var ctx = canvas.getContext("2d");
    //       ctx.drawImage(img, 0, 0);

    //       var MAX_WIDTH = 400;
    //       var MAX_HEIGHT = 300;
    //       var width = img.width;
    //       var height = img.height;

    //       if (width > height) {
    //         if (width > MAX_WIDTH) {
    //           height *= MAX_WIDTH / width;
    //           width = MAX_WIDTH;
    //         }
    //       } else {
    //         if (height > MAX_HEIGHT) {
    //           width *= MAX_HEIGHT / height;
    //           height = MAX_HEIGHT;
    //         }
    //       }
    //       canvas.width = width;
    //       canvas.height = height;
    //       var ctx = canvas.getContext("2d");
    //       ctx.drawImage(img, 0, 0, width, height);

    //       dataurl = canvas.toDataURL("image/jpeg");
    //     $scope.avatar = dataurl;
    //     console.log("dataurl === ", dataurl)
    //   };
      reader.readAsDataURL( file );
    }; //adds image data to $scope.avatar

    $scope.updateMods = function() {
      Racers.updateModListAndPts({racer: $scope.username, avatar: "https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg", modList: $scope.modList, modPts: $scope.modPts}).then(function(resp){
        console.log("modlist and pts updated!");
      })
      $("body").scrollTop(0);
      
    };

    // var $window = $(window),
    //    $stickyEl = $('.userinfo'),
    //    elTop = $stickyEl.offset().top;

    // $window.scroll(function() {
    //     $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    // });
    $('#profile').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
    })
//////////////////////////////////////////////////////////////////////////////////////////

  })


 