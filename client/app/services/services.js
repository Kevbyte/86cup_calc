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

    var getModList = function() {
      console.log("get mod list")
      return $http({
        method: 'GET',
        url: '/racers/modList',
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

    var getStats = function() {
      return $http({
        method: 'GET',
        url: '/events/getEvents'
      })
    };

    var deleteTrackEvents = function() {
      return $http({
        method: 'POST',
        url: '/events/deleteTrackEvents'
      })
    };

    var getUpcomingEvents = function() {
      return $http({
        method: 'GET',
        url: '/events/getUpcomingEvents'
      })
    };

    var addUpcomingEvent = function(upcomingEvent) {
      return $http({
        method: 'POST',
        url: '/events/addUpcomingEvent',
        data: upcomingEvent
      })
    };

    var deleteUpcomingEvent = function(round) {
      return $http({
        method: 'POST',
        url: '/events/deleteUpcomingEvent',
        data: round
      })
    };


    return {
      addTrackEvent: addTrackEvent,
      getEvents: getEvents,
      getStats: getStats,
      deleteTrackEvents: deleteTrackEvents,
      addUpcomingEvent: addUpcomingEvent,
      getUpcomingEvents: getUpcomingEvents,
      deleteUpcomingEvent: deleteUpcomingEvent
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
        $window.localStorage.setItem('username', resp.config.data.username);
        $location.path('/main');
        isAdmin().then(function() {
            console.log('You are admin!');
            $('.admin-button').show();
          }).catch(function(error) {
            $('.admin-button').hide();
          })
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
        $location.path('/main');
        // return resp.data.token;
      });
    };

    // helper to check if users are authorized
    var isAuth = function () {
      return $http({
        method: 'GET',
        url: '/auth/isAuth'
      })
      // return !!$window.localStorage.getItem('racepro');
    };

    // signs out users
    var logout = function (user) {
      $window.localStorage.clear();
      // $window.localStorage.removeItem('racepro');
      // $location.path('/login');
      
      return $http({
        method: 'POST',
        url: '/auth/logout',
        data: user,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      })

    };

    var isAdmin = function () {
      return $http({
        method: 'GET',
        url: '/auth/isAdmin'
      })
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
      isAdmin: isAdmin,
      email: email,
      changePassword: changePassword
    };
  })