angular.module('86cup.master', [])
  .controller('MasterController', function ($scope) {
    var $window = $(window),
       $stickyEl = $('.vertical_nav'),
       elTop = $stickyEl.offset().top;

    $window.scroll(function() {
        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });
  });