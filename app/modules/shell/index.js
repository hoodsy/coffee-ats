'use strict';

angular.module('shell', [
  'auth',
  'user',
  'opportunity',
  'ui.router'
]).run(function(authService) {
  authService();
});
