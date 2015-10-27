angular.module('86cup.stats', [])
  .controller('StatsController', function ($scope, $window, $location, Racers, Events) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/')
    }
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }
    $scope.user = {};
    $scope.user.username = $window.localStorage.username.toLowerCase();
    $scope.events;
    $scope.stats = [];
    $scope.tracks = {BWR:{events:[]},MRLS:{events:[]},SRW:{events:[]},THR2:{events:[]},THR3C:{events:[]},THR3B:{events:[]},THR3:{events:[]},THR5:{events:[]}};

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
              console.log("username === ", $scope.user.username)
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
            $scope.tracks.BWR.events.push(event);
            $scope.tracks.BWR.hasEvent = true;
          }
          if(event.track === "MRLS") {
            $scope.tracks.MRLS.events.push(event);
            $scope.tracks.MRLS.hasEvent = true;
          }
          if(event.track === "SRW") {
            $scope.tracks.SRW.events.push(event);
            $scope.tracks.SRW.hasEvent = true;
          }
          if(event.track === "THR2") {
            $scope.tracks.THR2.events.push(event);
            $scope.tracks.THR2.hasEvent = true;
          }
          if(event.track === "THR3C") {
            $scope.tracks.THR3C.events.push(event);
            $scope.tracks.THR3C.hasEvent = true;
          }
          if(event.track === "THR3D") {
            $scope.tracks.THR3D.events.push(event);
            $scope.tracks.THR3D.hasEvent = true;
          }
          if(event.track === "THR3") {
            $scope.tracks.THR3.events.push(event);
            $scope.tracks.THR3.hasEvent = true;
          }
          if(event.track === "THR5") {
            $scope.tracks.THR5.events.push(event);
            $scope.tracks.THR5.hasEvent = true;
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


 