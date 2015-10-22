angular.module('86cup.admin', [])
  .controller('AdminController', function ($scope, $window, $location, Racers, Events) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/');
    }
    if($window.localStorage.username !== 'admin') {
      $location.path('/main');
      alert("You do not have access to this feature!");
    }
    $scope.trackEvent = {stock: {}, street: {}, limited: {}, unlimited: {}};
    $scope.trackEvent.stock.racers = [];
    $scope.trackEvent.street.racers = [];
    $scope.trackEvent.limited.racers = [];
    $scope.trackEvent.unlimited.racers = [];
    //grab racer list from db
    $scope.stock = {};
    $scope.street = {};
    $scope.limited = {};
    $scope.unlimited = {};

    $scope.getRacers = function() {
      Racers.getRacerList().then(function(resp) {
        console.log('resp.data === ', resp.data)
        $scope.stock.racers = resp.data.stock;
        $scope.street.racers = resp.data.street;
        $scope.limited.racers = resp.data.limited;
        $scope.unlimited.racers = resp.data.unlimited;

      }).then(function(){
        _.forEach($scope.stock.racers, function(racer){
          $scope.trackEvent.stock.racers.push({name: racer.username });
        })
        _.each($scope.street.racers, function(racer){
          $scope.trackEvent.street.racers.push({name: racer.username});
        })
        _.each($scope.limited.racers, function(racer){
          $scope.trackEvent.limited.racers.push({name: racer.username});
        })
        _.each($scope.unlimited.racers, function(racer){
          $scope.trackEvent.unlimited.racers.push({name: racer.username});
        })
        console.log('$scope.trackEvent === ', $scope.trackEvent)
      })
    };

    $scope.getRacers();
//////////////////////////////////////////////////////////////////////////////////////////

    $scope.addTrackEvent = function() {
      //send the whole track event to db including the racer list and their stats
      console.log($scope.trackEvent)
      Events.addTrackEvent($scope.trackEvent)
        .then(function(resp) {
          console.log('trackEvent update was successful !');
          alert("Track event submitted successfully");
        })
        .catch(function (error) {
          $scope.message = "That round already exists please try again";
          $('.admin__message').show()
          console.error(error);
        });
      $scope.updateRacerTotals = function() {
      //update the total points of individual racers in racer list
        Racers.updateRacerTotals($scope.trackEvent)
          .then(function(resp) {
          console.log(resp)

        })
      }
      $scope.updateRacerTotals();
    };

    $scope.deleteTrackEvents = function() {
      Events.deleteTrackEvents();
    }

    
  });


 