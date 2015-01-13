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
  })
  .state('home.job.billing', {
    url: '/billing',
    views: {
      'main@home': {
        controller: 'JobBillingCtrl',
        templateUrl: 'modules/job/partials/job-billing.html'
      }
    }
  })
  .state('home.job.details', {
    url: '/id/details',
    views: {
      'main@home': {
        controller: 'JobDetailsCtrl',
        templateUrl: 'modules/job/partials/job-details.html'
      }
    }
  })
});