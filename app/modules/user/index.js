'use strict';

angular.module('user', [
  'auth',
  'ngResource',
  'ui.router',
  'ngCookies'
]).constant('USER_CONFIG', {
  'numRequiredTags': 5,
  'maxEducations': 3,
  'maxExperiences': 3
});
