'use strict';

var app = angular.module('shell');

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('shell', {
        abstract: true,
        templateUrl: 'modules/shell/partials/shell.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/shell/partials/login.html'
      });
  });
