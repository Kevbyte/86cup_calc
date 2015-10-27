angular.module('86cup.master', [])
  .controller('MasterController', function ($scope, $window) {
    if($window.localStorage.username !== 'admin'){
      $('.admin-button').hide();
    }
    var $window = $(window),
       $stickyEl = $('.vertical_nav'),
       elTop = $stickyEl.offset().top;

    $window.scroll(function() {
        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });
  });