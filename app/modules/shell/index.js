'use strict';

angular.module('shell', [
  'auth',
  'feed',
  'user',
  'common',
  'opportunity',
  'messaging',
  'ui.router'
]).run(function(authService) {
  authService();
});
