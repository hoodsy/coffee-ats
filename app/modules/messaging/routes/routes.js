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
      });
  });
