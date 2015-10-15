angular.module('86cup.main', [])
  .controller('MainController', function ($scope, Racers) {
    var user = Racers.getAuthRacer();
    $scope.username = {name: user};
    
  });