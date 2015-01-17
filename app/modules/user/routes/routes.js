'use strict';

var app = angular.module('user');

app.config(function($stateProvider) {
  $stateProvider.state('shell.user', {
    url: '/user/:id?:palette',
    views: {
      'main@shell': {
        controller: 'UserCtrl',
        templateUrl: 'modules/user/partials/user-main.html'
      }
    }
  });
});
