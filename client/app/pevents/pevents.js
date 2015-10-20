angular.module('86cup.pevents', [])
  .controller('PeventsController', function ($scope, $window, $location, Racers) {
    if(!$window.localStorage.racepro){
      $location.path('/')
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
    
  });


 