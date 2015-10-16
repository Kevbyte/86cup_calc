angular.module('86cup.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $('.auth__message').hide()

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('racepro', token);
        $location.path('/main');
      })
      .catch(function (error) {
        $scope.message = "Invalid Username or Password";
        $('.auth__message').show()
        console.error(error);
      });
  };

  $scope.signup = function () {
    console.log($scope.user)
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('racepro', token);
        $location.path('/main');
      })
      .catch(function (error) {
        $scope.message = "Username Already Taken";
        console.error(error);
      });
  };

  $scope.logout = function() {
    //console.log('calling log out');
    $scope.user.username = $window.localStorage.getItem('username');
    console.log("inside log out ", $scope.user)
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