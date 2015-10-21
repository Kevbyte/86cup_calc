angular.module('86cup.profiles', [])
  .controller('ProfilesController', function ($scope, $window, $location, $window, Racers) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/')
    }
    var user = $window.localStorage.profiles;
    $scope.username = {name: user};
    $scope.modPts = 0;
    $scope.modList = {};
    $scope.class;
    $scope.avatar = "../assets/car-placeholder.png";
    
    //fetch a user's information from db
    $scope.getOtherModList = function() {
      //fetch user modlist data
      console.log('username === ', $scope.username);
      Racers.getOtherModList($scope.username)
        .then(function(resp){
          console.log('resp === ', resp.data)
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
    };

    $scope.getOtherModList()

    //A function to determine a user's class
    $scope.determineClass = function() {
      if($scope.modPts <= 0.5) {
        $scope.class = 'stock';
      }
      if($scope.modPts > 0.5 && $scope.modPts <= 4.5) {
        $scope.class = 'street';
      }
      if($scope.modPts > 4.5 && $scope.modPts <= 6.0) {
        $scope.class = 'limited';
      }
      if($scope.modPts > 6.0) {
        $scope.class = 'unlimited';
      }
      console.log($scope.class)
    };

//////////////////////////////////////////////////////////////////////////////////////////

  })


 