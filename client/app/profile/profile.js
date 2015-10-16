angular.module('86cup.profile', [])
  .controller('ProfileController', function ($scope, $window, $location, $window, Racers) {
    if(!$window.localStorage.racepro){
      $location.path('/')
    }
    var user = Racers.getAuthRacer();
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
          if(resp.data.avatar !== '') {
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
    };

    $scope.getModList();

    //user clicks on mod and toggles it active/not active
    $scope.toggleActiveDrivetrain = function(i, e) {
      if($scope.modList.mods.drivetrain[i].active === false) {
        $scope.modPts += $scope.modList.mods.drivetrain[i].value;
        console.log($scope.modPts);
      }else{
        $scope.modPts -= $scope.modList.mods.drivetrain[i].value;
      }
      $scope.modList.mods.drivetrain[i].active = !$scope.modList.mods.drivetrain[i].active;
      $scope.class = $scope.determineClass();
    };

    $scope.toggleActiveWheels = function(i) {
      if($scope.modList.mods.wheels[i].active === false) {
        $scope.modPts += $scope.modList.mods.wheels[i].value;
        console.log($scope.modPts);
      }else{
        $scope.modPts -= $scope.modList.mods.wheels[i].value;
      }
      $scope.modList.mods.wheels[i].active = !$scope.modList.mods.wheels[i].active;
      $scope.class = $scope.determineClass();
    };

    $scope.toggleActiveAero = function(i) {
      if($scope.modList.mods.aero[i].active === false) {
        $scope.modPts += $scope.modList.mods.aero[i].value;
      }else{
        $scope.modPts -= $scope.modList.mods.aero[i].value;
      }
      $scope.modList.mods.aero[i].active = !$scope.modList.mods.aero[i].active;
      $scope.class = $scope.determineClass();
    };

    $scope.toggleActiveSuspension = function(i) {
      if($scope.modList.mods.suspension[i].active === false) {
        $scope.modPts += $scope.modList.mods.suspension[i].value;
      }else{
        $scope.modPts -= $scope.modList.mods.suspension[i].value;
      }
      $scope.modList.mods.suspension[i].active = !$scope.modList.mods.suspension[i].active;
      $scope.class = $scope.determineClass();
    };

    //A function to determine a user's class
    $scope.determineClass = function() {
      if($scope.modPts <= 0.5) {
        return 'stock';
      }
      if($scope.modPts > 0.5 && $scope.modPts <= 4.5) {
        return 'street';
      }
      if($scope.modPts > 4.5 && $scope.modPts <= 6.0) {
        return 'limited';
      }
      if($scope.modPts > 6.0) {
        return 'unlimited';
      }
    };

    $scope.class = $scope.determineClass();

    //upload a photo to be used as an avatar
    $scope.add = function() {
      var preview = document.getElementById('pic');
      var f = document.getElementById('file').files[0];
      var r = new FileReader();
      r.onloadend = function(e){
        preview.src = e.target.result;
        $scope.avatar = e.target.result;
        console.log("avatar === ", $scope.avatar);
      };
      r.readAsDataURL( f );
    }; //adds image data to $scope.avatar

    //final form submission
    $scope.updateMods = function() {
      Racers.updateModListAndPts({racer: $scope.username, avatar: $scope.avatar, modList: $scope.modList, modPts: $scope.modPts}).then(function(resp){
        console.log("modlist and pts updated!");
      })
      
    };

//////////////////////////////////////////////////////////////////////////////////////////

  })


 