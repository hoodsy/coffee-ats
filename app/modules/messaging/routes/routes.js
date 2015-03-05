'use strict';

var app = angular.module('messaging');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.messaging', {
        abstract: true,
        views: {
          'main@shell': {
            templateUrl: 'modules/messaging/partials/messaging.html'
          }
        }
      })
      .state('shell.messaging.main', {
        url: '/messaging',
        views: {
          'main@shell.messaging': {
            templateUrl: 'modules/messaging/partials/messaging-main.html',
            controller: 'MessagingCtrl'
          },
          'xs@shell.messaging': {
            templateUrl: 'modules/messaging/partials/messaging-main.html',
            controller: 'MessagingCtrl'
          }
        }
      })
      .state('shell.messaging.main.detail', {
        url: '/:id',
        views: {
          'detail@shell.messaging': {
            templateUrl: 'modules/messaging/partials/messaging-detail.html',
            controller: 'MessagingDetailCtrl'
          },
          'xs@shell.messaging': {
            templateUrl: 'modules/messaging/partials/messaging-detail.html',
            controller: 'MessagingDetailCtrl'
          }
        }
      });
  });
