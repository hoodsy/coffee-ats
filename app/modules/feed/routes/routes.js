'use strict';

var app = angular.module('feed');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.feed', {
        url: '/feed',
        views: {
          'main@shell': {
            templateUrl: 'modules/feed/partials/feed.html',
            controller: 'FeedCtrl'
          }
        }
      });
  });
