angular.module('86cup.cevent', [])
  .controller('CeventController', function ($scope, $window, $location, Racers, Events) {
    $("body").scrollTop(0);
    // if(!$window.localStorage.racepro){
    //   $location.path('/')
    // }
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }

    $scope.upcomingEvents = []

    $scope.round;
    $scope.track = "Thunderhill East";
    $scope.date;
    $scope.organization = "NCRC";
    $scope.notes;
    $scope.editorEnabled = false;

    $scope.determineIcon = function(track) {
      if(track === "Thunderhill East") {
        return "../assets/THR3.jpg";
      }
      else if(track === "Mazda Raceway Laguna Seca") {
        return "../assets/MRLS.jpg";
      }
      else if(track === "Buttonwillow Raceway") {
        return "../assets/MRLS.jpg";
      }
      else if(track === "Sonoma Raceway") {
        return "../assets/MRLS.jpg";
      }
      else if(track === "Thunderhill West") {
        return "../assets/MRLS.jpg";
      }
    };

    $scope.determineRegistrationLink = function(organization) {
      if(organization === "NCRC") {
        return "http://www.ncracing.org/events.php";
      }
      else if(organization === "SpeedSF") {
        return "http://www.speedsf.com/events-registration/";
      }
    };

    $scope.icon = $scope.determineIcon();

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.eTrack = $scope.track;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function() {
    };

    $scope.addUpcomingEvent = function() {
      var upcomingEvent = {};
      upcomingEvent.round = $scope.round;
      upcomingEvent.track = $scope.track;
      upcomingEvent.date = JSON.stringify($scope.date).split("").slice(1,11).join("");
      upcomingEvent.organization = $scope.organization;
      upcomingEvent.notes = $scope.notes;
      Events.addUpcomingEvent(upcomingEvent).then(function(resp) {
        console.log("added event to db")
        $scope.getUpcomingEvents();
      })
      $scope.disableEditor();
    };

    $scope.getUpcomingEvents = function() {
      Events.getUpcomingEvents().then(function(resp) {
        console.log(resp.data)
        $scope.upcomingEvents = resp.data;
        _.forEach($scope.upcomingEvents, function(event) {
          event.icon = $scope.determineIcon(event.track)
        })
      })
    };

    $scope.deleteUpcomingEvent = function(i) {
      Events.deleteUpcomingEvent({round: $scope.upcomingEvents[i].round}).then(function(resp) {
        console.log('delete successful');
        $scope.getUpcomingEvents();
      })
    };

    $scope.getUpcomingEvents();

    // $scope.stock = {};
    // $scope.street = {};
    // $scope.limited = {};
    // $scope.unlimited = {};

    // $scope.getRacerList = function() {
    //   Racers.getRacerList().then(function(resp) {
    //     console.log('resp.datassss === ', resp.data)
    //     $scope.stock.racers = resp.data.stock;
    //     $scope.street.racers = resp.data.street;
    //     $scope.limited.racers = resp.data.limited;
    //     $scope.unlimited.racers = resp.data.unlimited;

    //   })
    // };

    // $scope.getRacerList()
    $('#cevent').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 