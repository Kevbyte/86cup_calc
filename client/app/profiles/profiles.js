angular.module('86cup.profiles', [])
  .controller('ProfilesController', function ($scope, $window, $location, $window, Racers, Events) {
    $("body").scrollTop(0);
    // if(!$window.localStorage.racepro){
    //   $location.path('/')
    // }
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }
    var user = $window.localStorage.profiles;
    $scope.username = {name: user};
    $scope.modPts = 0;
    $scope.modList = {};
    $scope.class;
    $scope.avatar = "../assets/car-placeholder.png";
    
    //fetch a user's information from db
    $scope.getOtherModList = function() {
      //fetch user modlist data
      console.log('username === ', $scope.username);
      Racers.getOtherModList($scope.username)
        .then(function(resp){
          console.log('resp === ', resp.data)
          if(resp.data.avatar !== "../assets/car-placeholder.png") {
            $scope.avatar = resp.data.avatar; 
          }
          $scope.modList.mods = resp.data.modList;
          $scope.modPts = resp.data.modPts;
        })
        .then(function() {
          _.forEach($scope.modList.mods.drivetrain, function(mod, i) {
            if(mod.active === true) {
              setTimeout(function() {
                $('.'+i).prop('checked', 'checked')
              }, 10)
            }
          })
        })
        .then(function() {
          $scope.determineClass();
        })
    };

    $scope.getOtherModList()

    //A function to determine a user's class
    $scope.determineClass = function() {
      if($scope.modPts <= 0.5) {
        $scope.class = 'Stock';
      }
      if($scope.modPts > 0.5 && $scope.modPts <= 4.5) {
        $scope.class = 'Street';
      }
      if($scope.modPts > 4.5 && $scope.modPts <= 6.0) {
        $scope.class = 'Limited';
      }
      if($scope.modPts > 6.0) {
        $scope.class = 'Unlimited';
      }
      console.log($scope.class)
    };
    $('#profile').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })

// STATS
    
    
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
              if(racer.name === user) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          _.forEach(event.street, function (racer) {
              if(racer.name === user) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          _.forEach(event.limited, function (racer) {
              if(racer.name === user) {
                  $scope.stats.push({round:event.round, track:event.track, date:event.date, racer:racer})
              }
          })
          _.forEach(event.unlimited, function (racer) {
              if(racer.name === user) {
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

  })


 