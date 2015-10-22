angular.module('86cup.stats', [])
  .controller('StatsController', function ($scope, $window, $location, Racers, Events) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/')
    }
    $scope.user = {};
    $scope.user.username = $window.localStorage.username;
    $scope.events;
    $scope.stats = [];
    $scope.tracks = {BWR:[], MRLS:[], SRW:[], THR2:[], THR3:[], THR5:[]}

    $scope.getStats = function() {
      Events.getStats().then(function(resp) {
        console.log('resp.datassss === ', resp.data)
        $scope.events = resp.data;
      })
      .then(function() {
        _.forEach($scope.events, function (event) {
          var newDate = event.date.split("").slice(0,10).join("");
          event.date = newDate;
          _.forEach(event.stock, function (racer) {
              if(racer.name === $scope.user.username) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          _.forEach(event.street, function (racer) {
              if(racer.name === $scope.user.username) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          _.forEach(event.limited, function (racer) {
              if(racer.name === $scope.user.username) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          _.forEach(event.unlimited, function (racer) {
              if(racer.name === $scope.user.username) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          console.log($scope.stats);
        })
      })
      .then(function() {
        _.forEach($scope.stats, function (event){
          console.log("event", event)
          if(event.track === "BWR") {
            $scope.tracks.BWR.push(event);
          }
          if(event.track === "MRLS") {
            $scope.tracks.MRLS.push(event);
          }
          if(event.track === "SRW") {
            $scope.tracks.SRW.push(event);
          }
          if(event.track === "THR2") {
            $scope.tracks.THR2.push(event);
          }
          if(event.track === "THR3") {
            $scope.tracks.THR3.push(event);
          }
          if(event.track === "THR5") {
            $scope.tracks.THR5.push(event);
          }
          console.log($scope.tracks)
        })
      })
    };

    $scope.getStats()

    $('#stats').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 