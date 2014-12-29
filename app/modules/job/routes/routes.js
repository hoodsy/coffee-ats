'use strict';

var app = angular.module('job');

app.config(function($stateProvider) {
  $stateProvider
  .state('home.job', {
    url: '/jobs',
    views: {
      'main': {
        controller: 'JobDashboardCtrl',
        templateUrl: 'modules/job/partials/job-main.html'
      }
    }
  })
  .state('home.job.create', {
    url: '/new',
    views: {
      'main@home': {
        controller: 'JobCreateCtrl',
        templateUrl: 'modules/job/partials/job-create.html'
      }
    }
  });
});