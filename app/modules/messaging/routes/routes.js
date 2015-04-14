'use strict';

var app = angular.module('messaging');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.messaging', {
        url: '/messaging?:opId',
        sticky: true,
        views: {
          'main@shell': {
            templateUrl: 'modules/messaging/partials/messaging.html',
            controller: 'MessagingCtrl'
          }
        }
      })
      .state('shell.messaging.main', {
        views: {
          'main@shell.messaging': {
            templateUrl: 'modules/messaging/partials/messaging-main.html'
          },
          'xs@shell.messaging': {
            templateUrl: 'modules/messaging/partials/messaging-main.html'
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
