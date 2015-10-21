angular.module('86cup.pevents', [])
  .controller('PeventsController', function ($scope, $window, $location, Racers, Events) {
    $("body").scrollTop(0);
    if(!$window.localStorage.racepro){
      $location.path('/')
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
        })
      })
    };

    $scope.getEvents()
    $('#pevents').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 