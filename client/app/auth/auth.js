angular.module('86cup.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('racepro', token);
        $location.path('/');
      })
      .catch(function (error) {
        $scope.message = "Invalid Username or Password";
        //console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('racepro', token);
        $location.path('/');
      })
      .catch(function (error) {
        $scope.message = "Username Already Taken";
        console.error(error);
      });
  };

  $scope.logout = function() {
    //console.log('calling log out');
    $scope.user.username = $window.localStorage.getItem('username');
    //console.log("inside log out ", $scope.user)
    Auth.logout($scope.user)
    .then(function (token){    
      //console.log('inside then: im signing out') 
      $window.localStorage.removeItem('racepro');
      $location.path('/login');
    })
    .catch(function (error) {
        $scope.message = "Username Not Found";
        //console.error(error);
    });
  };
});