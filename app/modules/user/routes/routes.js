'use strict';

var app = angular.module('user');

app.config(function($stateProvider) {
  $stateProvider.state('home.user', {
    url: '/user/:id',
    views: {
      'main': {
        controller: 'UserCtrl',
        templateUrl: 'modules/user/partials/user-main.html'
      }
    }
  });
});