'use strict';

angular.module('user', [
  'auth',
  'ngResource',
  'ui.router',
  'ngCookies'
]).constant('USER_CONFIG', {
  'headlineCharLimit': 140,
  'numRequiredTags': 5
});
