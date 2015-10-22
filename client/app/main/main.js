angular.module('86cup.main', [])
  .controller('MainController', function ($scope, $window, $location, Racers, Auth) {
    $('#main').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      console.log("no token")
      $location.path('/')
    }
    var user = $window.localStorage.username.toLowerCase();
    $scope.username = {name: user};
    
  });