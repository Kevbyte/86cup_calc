angular.module('86cup.cevent', [])
  .controller('CeventController', function ($scope, $window, $location, Racers) {
    $("body").scrollTop(0);
    // if(!$window.localStorage.racepro){
    //   $location.path('/')
    // }
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }
    // $scope.stock = {};
    // $scope.street = {};
    // $scope.limited = {};
    // $scope.unlimited = {};

    // $scope.getRacerList = function() {
    //   Racers.getRacerList().then(function(resp) {
    //     console.log('resp.datassss === ', resp.data)
    //     $scope.stock.racers = resp.data.stock;
    //     $scope.street.racers = resp.data.street;
    //     $scope.limited.racers = resp.data.limited;
    //     $scope.unlimited.racers = resp.data.unlimited;

    //   })
    // };

    // $scope.getRacerList()
    $('#cevent').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 