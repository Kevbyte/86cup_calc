angular.module('86cup.services', [])
  .factory('Racers', function ($http) {
    // gets the currently logged in user
    var getAuthRacer = function() {
      return window.localStorage.getItem('username');
    };

    var getRacerList = function() {
      return $http({
        method: 'GET',
        url: '/racers/racerList'
      })
    };

    var getModList = function(racer) {
      return $http({
        method: 'GET',
        url: '/racers/modList',
        params: racer
      })
    };

    var updateRacerTotals = function(racers) {
      console.log('Inside updateRacerTotals')
      return $http({
        method: 'POST',
        url: '/racers/updateRacerTotals',
        data: racers
      })
    };

    var updateModListAndPts = function(data) {
      return $http({
        method: 'POST',
        url: '/racers/updateModListAndPts',
        data: {
                racer: data.racer,
                avatar: data.avatar,
                modList: data.modList,
                modPts: data.modPts
              }
      })
    };

    return {
      getAuthRacer: getAuthRacer,
      getRacerList: getRacerList,
      getModList: getModList,
      updateRacerTotals: updateRacerTotals,
      updateModListAndPts: updateModListAndPts
    }
  })

  .factory('Events', function ($http) {
    var addTrackEvent = function(trackEvent) {
      return $http({
        method: 'POST',
        url: '/events/addTrackEvent',
        data: trackEvent
      })
    }
    return {
      addTrackEvent: addTrackEvent
    }
  })

  .factory('Auth', function ($http, $location, $window) {
    
    // signs users in
    var login = function (user) {
      return $http({
        method: 'POST',
        url: '/auth/login',
        data: user
      })
      .then(function (resp) {
        console.log(resp)
        // Saving a global username to be used throughout app
        $window.localStorage.setItem('username', resp.config.data.username);
        return resp.data.token;
      })
    };

    // signs users up
    var signup = function (user) {
      return $http({
        method: 'POST',
        url: '/auth/signup',
        data: user
      })
      .then(function (resp) {
        // Saving a global username to be used throughout app
        $window.localStorage.setItem('username', resp.config.data.username);
        return resp.data.token;
      });
    };

    // helper to check if users are authorized
    var isAuth = function () {
      return !!$window.localStorage.getItem('racepro');
    };

    // signs out users
    var logout = function (user) {
      $window.localStorage.setItem('username', undefined);
      $window.localStorage.removeItem('racepro');
      $location.path('/login');
      
      return $http({
        method: 'POST',
        url: '/auth/logout',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });

    };

    // return all funcs as an obj
    return {
      login: login,
      signup: signup,
      isAuth: isAuth,
      logout: logout
    };
  })