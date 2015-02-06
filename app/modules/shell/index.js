'use strict';

angular.module('shell', [
  'common',
  'auth',
  'feed',
  'user',
  'opportunity',
  'messaging',
  'ui.router'
]).run(function(authService) {
  authService();
});
