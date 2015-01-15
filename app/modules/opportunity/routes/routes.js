'use strict';

var app = angular.module('opportunity');

app.config(function($stateProvider) {
  $stateProvider
  .state('home.opportunity', {
    url: '/opportunities',
    views: {
      'main': {
        controller: 'OpportunityDashboardCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-dashboard.html'
      }
    }
  })
  .state('home.opportunity.create', {
    url: '/new',
    views: {
      'main@home': {
        controller: 'OpportunityCreateCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-create.html'
      }
    }
  })
  .state('home.opportunity.billing', {
    url: '/billing',
    views: {
      'main@home': {
        controller: 'OpportunityBillingCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-billing.html'
      }
    }
  })
  .state('home.opportunity.details', {
    url: '/:id/details',
    views: {
      'main@home': {
        controller: 'OpportunityDetailsCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-details.html'
      }
    }
  })
});
