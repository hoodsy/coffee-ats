'use strict';

var app = angular.module('shell');

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('login');
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'modules/shell/partials/shell.html',
        controller: 'ShellCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'modules/shell/partials/login.html'
      });
  });
