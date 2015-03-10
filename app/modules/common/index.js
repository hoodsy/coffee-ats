'use strict';

angular.module('common', [
  'partials',
  'ui.router',
  'ngTouch',
  'monospaced.elastic',  // auto-resizing textarea
  'matchMedia'
]).run(function ($rootScope, screenSize) {
  $rootScope.isDesktop = screenSize.is('lg');
  $rootScope.isMobile = screenSize.is('xs, sm, md');
});
