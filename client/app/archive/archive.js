angular.module('86cup.archive', [])
  .controller('ArchiveController', function ($scope, $window, $location, Racers, Auth) {
    $("body").scrollTop(0);
    
    $scope.archive = [];

    $scope.getArchive = function() {
      Racers.getArchive().then(function(resp) {
        $scope.archive = resp.data;
        console.log(resp.data)
      })
    };

    $scope.getArchive()

    $scope.revealButton = false;

    Auth.isAdmin().then(function() {
        $scope.revealButton = true;
        console.log('You are admin!');
    })

    if($window.localStorage.username === 'admin'){
    }

    $scope.nukesRevealed = false;

    $scope.nukeControls = function() {
      $scope.nukesRevealed = true;
      $scope.revealButton = false;
      alert("How easy it is to judge rightly after one sees what evil comes from judging wrongly.")
    }
    

    $scope.deleteArchive = function() {
      Racers.deleteArchive().then(function(resp) {
        alert("You have just deleted all archived standings records!")
      })
    }


    // $scope.redirectToUserStock = function(i) {
    //   $window.localStorage.profiles = $scope.stock.racers[i].username;
    //   $location.path('/profiles');
    // }
    // $scope.redirectToUserStreet = function(i) {
    //   $window.localStorage.profiles = $scope.street.racers[i].username;
    //   $location.path('/profiles');
    // }
    // $scope.redirectToUserLimited = function(i) {
    //   $window.localStorage.profiles = $scope.limited.racers[i].username;
    //   $location.path('/profiles');
    // }
    // $scope.redirectToUserUnlimited = function(i) {
    //   $window.localStorage.profiles = $scope.unlimited.racers[i].username;
    //   $location.path('/profiles');
    // }

    $('#standings').click(function() {
        $('.vertical_nav').removeClass('vertical_nav__opened');
    })
    
  });


 