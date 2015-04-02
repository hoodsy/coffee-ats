'use strict';

var app = angular.module('shell');

app.config(function ($stateProvider, $urlRouterProvider, authServiceProvider) {
    $urlRouterProvider.otherwise('/feed');
    $stateProvider
      .state('shell', {
        abstract: true,
        templateUrl: 'modules/shell/partials/shell.html',
        resolve: {
          'auth': authServiceProvider.$get().auth
        }
      })
      .state('shell.login', {
        url: '/login',
        resolve: {
          'feedResource': 'LoginFeed'
        },
        views: {
          'main@shell': {
            templateUrl: 'modules/feed/partials/feed.html',
            controller: 'FeedCtrl'
          },
          'overlay@shell': {
            templateUrl: 'modules/shell/partials/login.html',
            controller: 'LoginCtrl'
          }
        }
      });
  });
