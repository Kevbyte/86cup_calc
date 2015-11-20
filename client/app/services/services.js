angular.module('86cup.services', [])
  .factory('Racers', function ($http) {
    // gets the currently logged in user
    // var getAuthRacer = function() {
    //   return window.localStorage.getItem('username');
    // };

    var getRacerList = function() {
      return $http({
        method: 'GET',
        url: '/racers/racerList',
        timeout: 2000
      })
    };

    var getModList = function(racer) {
      console.log("get mod list")
      return $http({
        method: 'GET',
        url: '/racers/modList',
        params: racer,
        timeout: 2000,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
    };

    var getOtherModList = function(racer) {
      return $http({
        method: 'GET',
        url: '/racers/otherModList',
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
              },
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
    };

    var archiveStandings = function(data) {
      return $http({
        method: 'POST',
        url: '/standings/archiveStandings',
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
    };

    var getArchive = function() {
      return $http({
        method: 'GET',
        url: '/standings/getArchive'
      })
    }

    var deleteArchive = function() {
      return $http({
        method: 'POST',
        url: '/standings/deleteArchive'
      })
    }

    var deleteUsers = function() {
      return $http({
        method: 'POST',
        url: '/racers/deleteUsers'
      })
    };

    return {
      getRacerList: getRacerList,
      getModList: getModList,
      getOtherModList: getOtherModList,
      updateRacerTotals: updateRacerTotals,
      updateModListAndPts: updateModListAndPts,
      archiveStandings: archiveStandings,
      getArchive: getArchive,
      deleteArchive: deleteArchive,
      deleteUsers: deleteUsers
    }
  })

  .factory('Events', function ($http) {
    var addTrackEvent = function(trackEvent) {
      return $http({
        method: 'POST',
        url: '/events/addTrackEvent',
        data: trackEvent
      })
    };

    var getEvents = function() {
      return $http({
        method: 'GET',
        url: '/events/getEvents'
      })
    };

    var getStats = function(racer) {
      return $http({
        method: 'GET',
        url: '/events/getEvents',
        params: racer
      })
    };

    var deleteTrackEvents = function() {
      return $http({
        method: 'POST',
        url: '/events/deleteTrackEvents'
      })
    };


    return {
      addTrackEvent: addTrackEvent,
      getEvents: getEvents,
      getStats: getStats,
      deleteTrackEvents: deleteTrackEvents
    }
  })

  .factory('Auth', function ($http, $location, $window) {
    
    // signs users in
    var login = function (user) {
      return $http({
        method: 'POST',
        url: '/auth/login',
        data: user,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })
      .then(function (resp) {
        console.log(resp)
        // Saving a global username to be used throughout app
        $window.localStorage.setItem('username', resp.config.data.username);
        $window.localStorage.setItem('racepro', resp.data.token);
        $location.path('/main');
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
    var logout = function () {
      $window.localStorage.clear();
      // $window.localStorage.removeItem('racepro');
      $location.path('/login');
      
      // return $http({
      //   method: 'POST',
      //   url: '/auth/logout',
      //   data: user,
      //   contentType: "application/json; charset=utf-8",
      //   dataType: "json"
      // })
      // .then(function (resp) {
      //   return resp.data.token;
      // });

    };

    var email = function(email) {
      return $http({
        method: 'POST',
        url: '/auth/email',
        data: {email: email}
      })
    };

    var changePassword = function(data) {
      return $http({
        method: 'POST',
        url: '/auth/changePassword',
        data: {data}
      })
    };

    // return all funcs as an obj
    return {
      login: login,
      signup: signup,
      isAuth: isAuth,
      logout: logout,
      email: email,
      changePassword: changePassword
    };
  })