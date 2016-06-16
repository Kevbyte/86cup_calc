/*
==========================
Vertical Responsive Menu
==========================
*/

'use strict';


var tid = setInterval( function () {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );


  var querySelector = document.querySelector.bind(document);

  var nav = document.querySelector('.vertical_nav');
  var wrapper = document.querySelector('.wrapper');

  var menu = document.getElementById("js-menu");
  var subnavs = menu.querySelectorAll('.menu--item__has_sub_menu');


  // Toggle menu click
  querySelector('.toggle_menu').onclick = function () {

    nav.classList.toggle('vertical_nav__opened');

    wrapper.classList.toggle('toggle-content');

  };  

  $('.menu--item').click(function() {
    $('.vertical_nav').removeClass('vertical_nav__opened');
    $('.wrapper').removeClass('toggle-content');
  })

  $('.sub_menu--item').click(function() {
    $('.vertical_nav').removeClass('vertical_nav__opened');
    $('.wrapper').removeClass('toggle-content');
  })


  // Minify menu on menu_minifier click
  querySelector('.collapse_menu').onclick = function () {

    nav.classList.toggle('vertical_nav__minify');

    wrapper.classList.toggle('wrapper__minify');

    for (var j = 0; j < subnavs.length; j++) {

      subnavs[j].classList.remove('menu--subitens__opened');

    }

  };


  // Open Sub Menu
  $('.menu--item__has_sub_menu').click(function() {
    $('.menu--item__has_sub_menu').toggleClass('menu--subitens__opened');
  });

  $('.menu--item__has_sub_menu2').click(function() {
    $('.menu--item__has_sub_menu2').toggleClass('menu--subitens__opened');
  });
  // for (var i = 0; i < subnavs.length; i++) {

  //   if (subnavs[i].classList.contains('menu--item__has_sub_menu') ) {

  //     subnavs[i].addEventListener('click', function (e) {

  //       for (var j = 0; j < subnavs.length; j++) {

  //         if(this != subnavs[j])
  //           subnavs[j].classList.remove('menu--subitens__opened');
          

  //       }

  //       this.classList.toggle('menu--subitens__opened');

  //     }, false);

  //   }
  // }


}, 100 );

