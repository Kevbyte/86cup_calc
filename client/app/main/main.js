angular.module('86cup.main', [])
  .controller('MainController', function ($scope, $window, $location, Racers, Auth) {
    $('#main').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    $("body").scrollTop(0);

    Auth.isAdmin().then(function() {
        console.log('You are admin!');
      }).catch(function(error) {
        $(".intro-admin a").click(function(event){
            event.preventDefault();
        });
    })
    
    var user = $window.localStorage.username.toLowerCase();
    $scope.username = {name: user};
    // $scope.foobar = {name: 'FOOBAR'};
    
  });