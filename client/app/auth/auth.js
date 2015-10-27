angular.module('86cup.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $("body").scrollTop(0);
  $scope.user = {};
  $('.auth__message').hide()
  $('#login').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
  })
  $('#signup').click(function() {
      $('.vertical_nav').removeClass('vertical_nav__opened');
  })
  if($window.localStorage.username !== 'admin'){
    $('.admin-button').hide();
  }

  $scope.user = {};

  $scope.login = function () {
    var racer = {username: $scope.user.username.toLowerCase(), password: $scope.user.password};
    Auth.login(racer)
      // .then(function (token) {
      //   $window.localStorage.setItem('racepro', token);
      //   $location.path('/main');
      // })
      .catch(function (error) {
        $scope.message = "Invalid Username or Password";
        $('.auth__message').show()
        console.error(error);
      });
  };

  $scope.signup = function () {
    var racer = {username: $scope.user.username.toLowerCase(), password: $scope.user.password};
    Auth.signup(racer)
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