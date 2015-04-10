'use strict';

var app = angular.module('user');

app.config(function($stateProvider) {
  $stateProvider.state('shell.user', {
    url: '/users',
    abstract: true
  })
  .state('shell.user.detail', {
    url: '/:id?:palette',
    views: {
      'main@shell': {
        controller: 'UserDetailCtrl',
        templateUrl: 'modules/user/partials/user-detail.html'
      }
    }
  })
  .state('shell.user.detail.edit', {
    url: '/edit',
    views: {
      'main@shell': {
        controller: 'UserDetailEditCtrl',
        templateUrl: 'modules/user/partials/user-detail-edit.html'
      }
    }
  })
  .state('shell.user.detail.setup', {
    url: '/setup',
    views: {
      'navbar@shell': {},
      'container@shell': {
        controller: 'UserDetailEditCtrl',
        templateUrl: 'modules/user/partials/user-detail-edit.html'
      }
    }
  });
});
