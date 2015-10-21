angular.module('86cup.standings', [])
  .controller('StandingsController', function ($scope, $window, $location, Racers) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro || $window.localStorage.racepro === 'undefined'){
      $location.path('/')
    }
    $scope.stock = {};
    $scope.street = {};
    $scope.limited = {};
    $scope.unlimited = {};

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

    $scope.redirectToUserStock = function(i) {
      $window.localStorage.profiles = $scope.stock.racers[i].username;
      $location.path('/profiles');
    }
    $scope.redirectToUserStreet = function(i) {
      $window.localStorage.profiles = $scope.street.racers[i].username;
      $location.path('/profiles');
    }
    $scope.redirectToUserLimited = function(i) {
      $window.localStorage.profiles = $scope.limited.racers[i].username;
      $location.path('/profiles');
    }
    $scope.redirectToUserUnlimited = function(i) {
      $window.localStorage.profiles = $scope.unlimited.racers[i].username;
      $location.path('/profiles');
    }

    $('#standings').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 