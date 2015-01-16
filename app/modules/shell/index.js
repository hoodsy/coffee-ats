'use strict';

angular.module('shell', [
  'auth',
  'feed',
  'user',
  'common',
  'opportunity',
  'ui.router'
]).run(function(authService) {
  authService();
});
