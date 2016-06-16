angular.module('86cup.pevents', [])
  .controller('PeventsController', function ($scope, $window, $location, Racers, Events) {
    $("body").scrollTop(0);
    // if(!$window.localStorage.racepro){
    //   $location.path('/')
    // }
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }
    $scope.events;

    $scope.getEvents = function() {
      Events.getEvents().then(function(resp) {
        console.log('resp.datassss === ', resp.data)
        $scope.events = resp.data;
      })
      .then(function() {
        _.forEach($scope.events, function(event) {
            var newDate = event.date.split("").slice(0,10).join("");
            event.date = newDate;
            
            if(event.stock.length > 0) {
              console.log("true!")
              event.hasStock = true;
            }
            if(event.street.length > 0) {
              event.hasStreet = true;
            }
            if(event.limited.length > 0) {
              event.hasLimited = true;
            }
            if(event.unlimited.length > 0) {
              event.hasUnlimited = true;
            }

            if(event.track === 'BWR') {
              event.track = 'BW13CW';
            }
            if(event.track === 'MRLS') {
              event.track = 'Laguna S';
            }
            if(event.track === 'SRW') {
              event.track = 'Sonoma R';
            }
            if(event.track === 'THR2') {
              event.track = 'T-Hill W';
            }
            if(event.track === 'THR3C') {
              event.track = 'T-Hill Cyc';
            }
            if(event.track === 'THR3B') {
              event.track = 'T-Hill Byp';
            }
            if(event.track === 'THR3') {
              event.track = 'T-Hill E';
            }
            if(event.track === 'THR5') {
              event.track = 'T-Hill 5';
            }
        })
      })
    };

    $scope.getEvents()

    $scope.redirectToUserStock = function(e) {
      console.log(e.target.innerText)
      $window.localStorage.profiles = e.target.innerText;
      $location.path('/profiles');
    }
    $scope.redirectToUserStreet = function(e) {
      $window.localStorage.profiles = e.target.innerText;
      $location.path('/profiles');
    }
    $scope.redirectToUserLimited = function(e) {
      $window.localStorage.profiles = e.target.innerText;
      $location.path('/profiles');
    }
    $scope.redirectToUserUnlimited = function(e) {
      $window.localStorage.profiles = e.target.innerText;
      $location.path('/profiles');
    }


    $('#pevents').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 