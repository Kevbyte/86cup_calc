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
      // console.log('username === ', $scope.username);
      Racers.getModList($scope.username)
        .then(function(resp){
          // console.log('resp === ', resp.data)
          if(resp.data.avatar !== "../assets/car-placeholder.png") {
            $scope.avatar = resp.data.avatar; 
          }
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
        .catch(function(error){
          console.log(error);
        })
    };

    if($window.localStorage.username !== 'admin') {
      $scope.getModList()
    }else{
      $scope.avatar = "../assets/zeus.jpg";
      $('.userinfo, .button, .instructions, .category').hide();
      alert("You are currently in admin mode. Only regular users can set a profile.");
      $('.userinfo').removeClass('userinfo');

    }
    

    //user clicks on mod and toggles it active/not active
    $scope.toggleActiveDrivetrain = function(i, e) {
      if($scope.modList.mods.drivetrain[i].active === false) {
        $scope.modPts += $scope.modList.mods.drivetrain[i].value;
        // console.log($scope.modPts);
      }else{
        $scope.modPts -= $scope.modList.mods.drivetrain[i].value;
      }
      $scope.modList.mods.drivetrain[i].active = !$scope.modList.mods.drivetrain[i].active;
      $scope.determineClass();
    };

    $scope.toggleActiveWheels = function(i) {
      if($scope.modList.mods.wheels[i].active === false) {
        $scope.modPts += $scope.modList.mods.wheels[i].value;
        // console.log($scope.modPts);
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
        $scope.class = 'Stock';
      }
      if($scope.modPts > 0.5 && $scope.modPts <= 4.0) {
        $scope.class = 'Street';
      }
      if($scope.modPts > 4.0 && $scope.modPts <= 7.0) {
        $scope.class = 'Limited';
      }
      if($scope.modPts > 7.0) {
        $scope.class = 'Unlimited';
      }
      // console.log($scope.class)
    };


    // upload a photo to be used as an avatar
    $scope.add = function() {
      $('.button').hide();
      var file = document.getElementById('file').files[0];
      // var preview = document.getElementById('pic');
      var fileType = file.type;
      var reader = new FileReader();

      function get_signed_request(file){
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
          xhr.onreadystatechange = function(){
              if(xhr.readyState === 4){
                  if(xhr.status === 200){
                      var response = JSON.parse(xhr.responseText);
                      upload_file(file, response.signed_request, response.url);
                  }
                  else{
                      alert("Could not get signed URL.");
                  }
              }
          };
          xhr.send();
      };

      function upload_file(file, signed_request, url){
          var xhr = new XMLHttpRequest();
          xhr.open("PUT", signed_request);
          xhr.setRequestHeader('x-amz-acl', 'public-read');
          xhr.onload = function() {
              if (xhr.status === 200) {
                  $scope.avatar = url;
                  $('.button').show();
                  document.getElementById("pic").src = url;
              }
          };
          xhr.onerror = function() {
              alert("Could not upload file.");
          };
          xhr.send(file);
      };

      function dataURLtoBlob(dataurl) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type:mime});
      }

      reader.onloadend = function(e) {
        var image = new Image();
        image.src = reader.result;
        // preview.src = e.target.result;
        image.onload = function() {
          var maxWidth = 400,
              maxHeight = 400,
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

          var blob = dataURLtoBlob(finalFile);
          blob.name = '' + Math.random()*1000000000000000000;
          
          get_signed_request(blob);

        }
      }
      reader.readAsDataURL( file );
    }; //adds image data to $scope.avatar

    $scope.updateMods = function() {
      Racers.updateModListAndPts({racer: $scope.username, avatar: $scope.avatar, modList: $scope.modList, modPts: $scope.modPts}).then(function(resp){
        console.log("modlist and pts updated!");
      })
      $("body").scrollTop(0);
      
    };

    $('#profile').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
    })

    if($window.localStorage.username !== 'admin') {
      var $window = $(window),
         $stickyEl = $('.userinfo'),
         elTop = $stickyEl.offset().top;

        $window.scroll(function() {
            $('.phead').toggleClass('sticky', $window.scrollTop() > elTop);
            $('.info').toggleClass('visible', $window.scrollTop() > elTop);
        });
    }
//////////////////////////////////////////////////////////////////////////////////////////

  })


 