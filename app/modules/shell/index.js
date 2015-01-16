'use strict';

angular.module('shell', [
  'auth',
  'feed',
  'user',
  'opportunity',
  'ui.router'
]).run(function(authService) {
  authService();
});
