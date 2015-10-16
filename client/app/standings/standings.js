angular.module('86cup.standings', [])
  .controller('StandingsController', function ($scope, $window, $location, Racers) {
    if(!$window.localStorage.racepro){
      $location.path('/')
    }
    $scope.stock = {};
    $scope.street = {};
    $scope.limited = {};
    $scope.unlimited = {};
    // $scope.racerList.racers = [
    //   {rank: 1, name:'gboy', pts: 40, class: 'unlimited', add: 0},
    //   {rank: 2, name:'JJ', pts: 36, class: 'unlimited', add: 0}
    // ];

    $scope.getRacerList = function() {
      Racers.getRacerList().then(function(resp) {
        console.log('resp.datassss === ', resp.data)
        $scope.stock.racers = resp.data.stock;
        $scope.street.racers = resp.data.street;
        $scope.limited.racers = resp.data.limited;
        $scope.unlimited.racers = resp.data.unlimited;

      })
    };

    $scope.getRacerList()
    
  });


 