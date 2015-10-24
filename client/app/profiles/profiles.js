angular.module('86cup.profiles', [])
  .controller('ProfilesController', function ($scope, $window, $location, $window, Racers, Events) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/')
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
          console.log("$scope.stats ",$scope.stats);
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

  })


 