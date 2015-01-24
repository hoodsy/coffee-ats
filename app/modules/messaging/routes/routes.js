'use strict';

var app = angular.module('messaging');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.messaging', {
        url: '/messaging',
        views: {
          'main@shell': {
            templateUrl: 'modules/messaging/partials/messaging.html',
            controller: 'MessagingCtrl'
          }
        }
      })
      .state('shell.messaging.detail', {
        url: '/:id',
        views: {
          'main@shell': {
            templateUrl: 'modules/messaging/partials/messaging-detail.html',
            controller: 'MessagingDetailCtrl'
          }
        }
      });
  });
