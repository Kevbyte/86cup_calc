angular.module('86cup.main', [])
  .controller('MainController', function ($scope, $window, $location, Racers, Auth) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      console.log("no token")
      $location.path('/')
    }
    var user = Racers.getAuthRacer();
    $scope.username = {name: user};
    
  });