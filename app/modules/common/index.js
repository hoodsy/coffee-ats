'use strict';

angular.module('common', [
  'partials',
  'ui.router',
  'ngTouch',
  'hmTouchEvents',
  'monospaced.elastic',  // auto-resizing textarea
  'matchMedia'
]).run(function ($rootScope, screenSize) {
  $rootScope.isDesktop = screenSize.is('sm, md, lg');
  $rootScope.isMobile = screenSize.is('xs');

  // HammerJS prevents user selection by default, so unset that
  Hammer.defaults.stop_browser_behavior.userSelect = '';
});
