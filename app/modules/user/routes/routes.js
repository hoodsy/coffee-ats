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
     'overlay-detail@shell.user.detail': {
        controller: 'UserDetailCtrl',
        templateUrl: 'modules/user/partials/user-detail.html'
      },
      'overlay@shell': {
        templateUrl: 'modules/shell/partials/overlay.html',
        controller: 'OverlayDetailCtrl'
      }
    }
  })
  .state('shell.user.detail.edit', {
    url: '/edit',
    views: {
      'overlay@shell': {},
      'overlay-detail@shell.user.detail': {},
      'main@shell': {
        controller: 'UserDetailEditCtrl',
        templateUrl: 'modules/user/partials/user-detail-edit.html'
      }
    }
  })
  .state('shell.user.detail.setup', {
    url: '/setup',
    views: {
      'overlay@shell': {},
      'overlay-detail@shell.user.detail': {},
      'navbar@shell': {},
      'container@shell': {
        controller: 'UserDetailEditCtrl',
        templateUrl: 'modules/user/partials/user-detail-edit.html'
      }
    }
  });
});
