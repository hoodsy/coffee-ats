'use strict';

angular.module('common', [
  'partials',
  'ui.router',
  'ngTouch',
  'monospaced.elastic',  // auto-resizing textarea
  'matchMedia'
]).run(function ($rootScope, screenSize) {
  $rootScope.isDesktop = screenSize.is('sm, md, lg');
  $rootScope.isMobile = screenSize.is('xs');

  // Prevent submitting form on Enter
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
