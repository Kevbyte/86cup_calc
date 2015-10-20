angular.module('86cup', 
  [
  '86cup.landing',
  '86cup.main', 
  '86cup.standings', 
  '86cup.admin', 
  '86cup.profile',
  '86cup.services', 
  '86cup.auth',
  '86cup.master', 
  '86cup.stats',
  '86cup.profiles',
  '86cup.cevent',
  '86cup.pevents',
  'ui.router'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'app/auth/logout.html',
      controller: 'AuthController'
    })
    .state('standings', {
      url: '/standings',
      templateUrl: 'app/standings/standings.html',
      controller: 'StandingsController'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController'
    })
    .state('profiles', {
      url: '/profiles',
      templateUrl: 'app/profiles/profiles.html',
      controller: 'ProfilesController'
    })
    .state('stats', {
      url: '/stats',
      templateUrl: 'app/stats/stats.html',
      controller: 'StatsController'
    })
    .state('cevent', {
      url: '/cevent',
      templateUrl: 'app/cevent/cevent.html',
      controller: 'CeventController'
    })
    .state('pevents', {
      url: '/pevents',
      templateUrl: 'app/pevents/pevents.html',
      controller: 'PeventsController'
    })
    
    $urlRouterProvider.otherwise('/');
})

////////////////////////////////////////////////////////////
// config the app tokens
////////////////////////////////////////////////////////////

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AttachTokens');
})

////////////////////////////////////////////////////////////
// set up app factory for attaching tokens
////////////////////////////////////////////////////////////

.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('racepro');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

////////////////////////////////////////////////////////////
// boot up app directives
// 
// - headerMain: the main header bar for auth'd users
// - headerLogout: a directive specifically for logout
// - headerNoAuthPartial: a directive for rendering a static
//   HTML header on the signup/signin pages
// - footerPartial: a static html directive for the footer
////////////////////////////////////////////////////////////

.directive('headerMain', function() {
  return {
    restrict: 'E',
    scope: {
      userInfo: '=userInfo'
    },
    templateUrl: 'app/directives/header-main.html'
  };
})

.directive('headerLogout', function() {
  var link = function(scope, element, attrs) {
    element.bind('click', function(e) {
      e.preventDefault();
      scope.$parent.$apply(attrs.logout);
    });
  };

  return {
    link: link,
    restrict: 'E',
    templateUrl: 'app/directives/header-logout.html'
  };
})

.directive('headerNonAuthPartial', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/header-nonauth.html'
  };
})

.directive('footerPartial', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/directives/footer.html'
  };
})

////////////////////////////////////////////////////////////
// run the style
////////////////////////////////////////////////////////////

// .run(function ($rootScope, $window, $location, Auth, Racers) {


//   ////////////////////////////////////////////////////////////
//   // handle auth stuffs
//   ////////////////////////////////////////////////////////////

//   $rootScope.$on('$stateChangeStart', function (evt, next, current) {
//     // redirect home if auth required and user isn't auth
//     console.log("next.authenticate === ", next.authenticate)
//     if (next && next.authenticate && !Auth.isAuth()) {
//       $location.path('/');
//     }

//     // redirect to dashboard if user is auth and tries to access home page
//     if (next && next.url === '/' && Auth.isAuth()) {
//       $location.path('/');
//     }
//   });
// });
