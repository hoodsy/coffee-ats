'use strict';

var app = angular.module('opportunity');

app.config(function($stateProvider) {
  $stateProvider
  .state('shell.opportunity', {
    url: '/opportunities',
    views: {
      'main@shell': {
        controller: 'OpportunityDashboardCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-dashboard.html'
      }
    }
  })
  .state('shell.opportunity.detail', {
    url: '/:id?:palette',
    views: {
      'main@shell': {
        controller: 'OpportunityDetailCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-detail.html'
      }
    }
  })
  .state('shell.opportunity.create', {
    url: '/new',
    views: {
      'main@shell': {
        controller: 'OpportunityCreateCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-create.html'
      }
    }
  })
  .state('shell.opportunity.billing', {
    url: '/billing',
    views: {
      'main@shell': {
        controller: 'OpportunityBillingCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-billing.html'
      }
    }
  });
});
