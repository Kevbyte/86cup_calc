angular.module('86cup.admin', [])
  .controller('AdminController', function ($scope, $window, $location, Racers, Events, Auth) {
    $("body").scrollTop(0);

    Auth.isAdmin().then(function() {
        console.log('You are admin!')
      }).catch(function(error) {
        $location.path('/main')
      })

    if($window.localStorage.username !== 'admin') {
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

    $scope.submit = {stock: {racers: []}, street: {racers: []}, limited: {racers: []}, unlimited: {racers: []}};

    $scope.getRacers = function() {
      Racers.getRacerList().then(function(resp) {
        console.log('resp.data === ', resp.data)
        $scope.stock.racers = resp.data.stock;
        $scope.street.racers = resp.data.street;
        $scope.limited.racers = resp.data.limited;
        $scope.unlimited.racers = resp.data.unlimited;

      })
      .then(function() {
        _.forEach($scope.stock.racers, function(racer){
          $scope.trackEvent.stock.racers.push({name: racer.username, add: 0});
        })
        _.each($scope.street.racers, function(racer){
          $scope.trackEvent.street.racers.push({name: racer.username, add: 0});
        })
        _.each($scope.limited.racers, function(racer){
          $scope.trackEvent.limited.racers.push({name: racer.username, add: 0});
        })
        _.each($scope.unlimited.racers, function(racer){
          $scope.trackEvent.unlimited.racers.push({name: racer.username, add: 0});
        })
      })
      .then(function() {

      })
    };

    $scope.getRacers();

    //automatically calculate points to add from lap time
    $scope.calculated = false;
    $scope.calculate = function() {
      var points = [10, 7, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      _.forEach($scope.trackEvent.stock.racers, function(racer) {
        if(!racer.time) {
          racer.seconds = 100000;
        }else{
          var split = racer.time.split(':')
          if(split.length < 2) {
            split.push('00');
            split.push('00');
            console.log(split);
          }
          if(split.length < 3) {
            split.push('00');
            console.log(split);
          }
          racer.seconds = Number(split[0])*60 + Number(split[1]) + Number(split[2])/60  
        }
      })
      _.forEach($scope.trackEvent.street.racers, function(racer) {
        if(!racer.time) {
          racer.seconds = 100000;
        }else{
          var split = racer.time.split(':')
          if(split.length < 2) {
            split.push('00');
            split.push('00');
            console.log(split);
          }
          if(split.length < 3) {
            split.push('00');
            console.log(split);
          }
          racer.seconds = Number(split[0])*60 + Number(split[1]) + Number(split[2])/60  
        }
      })
      _.forEach($scope.trackEvent.limited.racers, function(racer) {
        if(!racer.time) {
          racer.seconds = 100000;
        }else{
          var split = racer.time.split(':')
          if(split.length < 2) {
            split.push('00');
            split.push('00');
            console.log(split);
          }
          if(split.length < 3) {
            split.push('00');
            console.log(split);
          }
          racer.seconds = Number(split[0])*60 + Number(split[1]) + Number(split[2])/60  
        }
      })
      _.forEach($scope.trackEvent.unlimited.racers, function(racer) {
        if(!racer.time) {
          racer.seconds = 100000;
        }else{
          var split = racer.time.split(':')
          if(split.length < 2) {
            split.push('00');
            split.push('00');
            console.log(split);
          }
          if(split.length < 3) {
            split.push('00');
            console.log(split);
          }
          racer.seconds = Number(split[0])*60 + Number(split[1]) + Number(split[2])/60  
        }
      })
      $scope.trackEvent.stock.racers.sort(function(a,b) {
        if (a.seconds > b.seconds) {return 1;}
        if (a.seconds < b.seconds) {return -1;}
        return 0;
      })
      var count = 0;
      _.forEach($scope.trackEvent.stock.racers, function(racer) {
        if(racer.seconds !== 100000) {
          racer.add = points[count];
          count++;
        }
      })
      $scope.trackEvent.street.racers.sort(function(a,b) {
        if (a.seconds > b.seconds) {return 1;}
        if (a.seconds < b.seconds) {return -1;}
        return 0;
      })
      var count = 0;
      _.forEach($scope.trackEvent.street.racers, function(racer) {
        if(racer.seconds !== 100000) {
          racer.add = points[count];
          count++;
        }
      })
      $scope.trackEvent.limited.racers.sort(function(a,b) {
        if (a.seconds > b.seconds) {return 1;}
        if (a.seconds < b.seconds) {return -1;}
        return 0;
      })
      var count = 0;
      _.forEach($scope.trackEvent.limited.racers, function(racer) {
        if(racer.seconds !== 100000) {
          racer.add = points[count];
          count++;
        }
      })
      $scope.trackEvent.unlimited.racers.sort(function(a,b) {
        if (a.seconds > b.seconds) {return 1;}
        if (a.seconds < b.seconds) {return -1;}
        return 0;
      })
      var count = 0;
      _.forEach($scope.trackEvent.unlimited.racers, function(racer) {
        if(racer.seconds !== 100000) {
          racer.add = points[count];
          count++;
        }
      })
      $scope.calculated = true;
      $scope.message = "Click 'Submit Event' if everything looks correct"
    }
//////////////////////////////////////////////////////////////////////////////////////////

    $scope.addTrackEvent = function() {
      //send the whole track event to db including the racer list and their stats
      var count = 0;
      _.forEach($scope.trackEvent, function(cat) {
        console.log("class = ", cat)
        _.forEach(cat.racers, function(racer) {
          if(racer.add > 0) {
            if(count === 0){
              console.log(racer)
              $scope.submit.stock.racers.push(racer);
            }
            if(count === 1){
              console.log(racer)
              $scope.submit.street.racers.push(racer);
            }
            if(count === 2){
              console.log(racer)
              $scope.submit.limited.racers.push(racer);
            }
            if(count === 3){
              console.log(racer)
              $scope.submit.unlimited.racers.push(racer);
            }
          }
        })
        count++;
      })
      console.log('$scope.trackEvent === ', $scope.trackEvent)
      console.log('submit', $scope.submit)
      $scope.submit.round = $scope.trackEvent.round;
      $scope.submit.track = $scope.trackEvent.track;
      $scope.submit.date = $scope.trackEvent.date;

      Events.addTrackEvent($scope.submit)
        .then(function(resp) {
          console.log('trackEvent update was successful !');
          alert("Track event submitted successfully");
          _.forEach($scope.trackEvent.stock.racers, function(racer){
            racer.add = 0;
            racer.seconds = 100000;
          })
          _.forEach($scope.trackEvent.street.racers, function(racer){
            racer.add = 0;
            racer.seconds = 100000;
          })
          _.forEach($scope.trackEvent.limited.racers, function(racer){
            racer.add = 0;
            racer.seconds = 100000;
          })
          _.forEach($scope.trackEvent.unlimited.racers, function(racer){
            racer.add = 0;
            racer.seconds = 100000;
          })
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
      $('#form input[type="text"]').val('');
      $('#form input[type="number"]').val('');
      $('#form input[type="date"]').val('');
      $('#form textarea').val('');
    };

    $scope.revealButton = true;

    $scope.nukesRevealed = false;

    $scope.nukeControls = function() {
      $scope.nukesRevealed = true;
      $scope.revealButton = false;
      alert("How easy it is to judge rightly after one sees what evil comes from judging wrongly.")
    }

    $scope.deleteUsers = function() {
      Racers.deleteUsers();
      alert("You just deleted all users!")
    }

    $scope.deleteTrackEvents = function() {
      Events.deleteTrackEvents();
      alert("You just deleted all events!")
    }

    
  });


 