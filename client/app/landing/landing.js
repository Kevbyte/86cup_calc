angular.module('86cup.landing', [])
  .controller('LandingController', function ($scope, Racers) {
    $("body").scrollTop(0);
    $('.landing').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }
  });