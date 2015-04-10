'use strict';

var app = angular.module('shell');

app.config(function ($stateProvider, $urlRouterProvider, authServiceProvider) {
    $urlRouterProvider.otherwise('/feed');
    $stateProvider
      .state('shell', {
        abstract: true,
        resolve: {
          'auth': authServiceProvider.$get().auth
        },
        views: {
          'root@': {
            templateUrl: 'modules/shell/partials/shell.html'
          },
          'navbar@shell': {
            templateUrl: 'modules/shell/partials/navbar.html'
          },
          'container@shell': {
            templateUrl: 'modules/shell/partials/container.html'
          }
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
