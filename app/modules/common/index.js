'use strict';

angular.module('common', [
  'partials',
  'ui.router',
  'ct.ui.router.extras.sticky',
  'ngTouch',
  'hmTouchEvents',
  'monospaced.elastic',  // auto-resizing textarea
  'matchMedia'
]).constant('APP_CONFIG', {
  'inputLimit': 50,
  'inputLimitLong': 500,
  'inputLimitHeadline': 140
}).run(function ($rootScope, screenSize, APP_CONFIG) {
  $rootScope.isDesktop = screenSize.is('sm, md, lg');
  $rootScope.isMobile = screenSize.is('xs');

  // HammerJS prevents user selection by default, so unset that
  Hammer.defaults.stop_browser_behavior.userSelect = '';

  // Config variables for entire app
  $rootScope.config = APP_CONFIG;
});
