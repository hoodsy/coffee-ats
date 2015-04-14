'use strict';

var app = angular.module('feed');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.feed', {
        url: '/feed?:opId',
        sticky: true,
        resolve: {
          'feedResource': 'Feed'
        },
        views: {
          'main@shell': {
            templateUrl: 'modules/feed/partials/feed.html',
            controller: 'FeedCtrl'
          }
        }
      });
  });
