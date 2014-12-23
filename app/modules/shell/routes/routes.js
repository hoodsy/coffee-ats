'use strict';

var app = angular.module('shell');

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'modules/shell/partials/shell.html',
        controller: 'ShellCtrl'
      });
  });