angular.module('86cup.standings', [])
  .controller('StandingsController', function ($scope, $window, $location, Racers) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro || $window.localStorage.racepro === 'undefined'){
      $location.path('/')
    }
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
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

        if(resp.data.stock.length > 0) {
          $scope.stock.hasStock = true;
        }
        if(resp.data.street.length > 0) {
          $scope.street.hasStreet = true;
        }
        if(resp.data.limited.length > 0) {
          $scope.limited.hasLimited = true;
        }
        if(resp.data.unlimited.length > 0) {
          $scope.unlimited.hasUnlimited = true;
        }
      })
    };

    $scope.getRacerList()

    $scope.archive = {year: ''};
    $scope.archive.stock = $scope.stock;
    $scope.archive.street = $scope.street;
    $scope.archive.limited = $scope.limited;
    $scope.archive.unlimited = $scope.unlimited;

    $scope.archiveStandings = function() {
      Racers.archiveStandings($scope.archive).then(function(resp) {
        alert("Archive successful!")
      })
    };

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


 