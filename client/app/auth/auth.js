angular.module('86cup.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $("body").scrollTop(0);
  $scope.user = {};
  $('.auth__message').hide()
  console.log("auth!")
  $('#login').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
  })
  $('#signup').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
  })

  $scope.login = function () {
    console.log("user === ", $scope.user);
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
  };
});