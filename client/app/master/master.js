angular.module('86cup.master', [])
  .controller('MasterController', function ($scope) {
    $scope.toggleSidebar = function() {
            $scope.toggle = !$scope.toggle;
            // $cookieStore.put('toggle', $scope.toggle);
        };
  });