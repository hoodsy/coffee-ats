'use strict';

var app = angular.module('opportunity');

app.config(function($stateProvider) {

  $stateProvider
  .state('shell.opportunities', {
    url: '/opportunities',
    sticky: true,
    views: {
      'main@shell': {
        controller: 'OpportunityDashboardCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-dashboard.html'
      }
    }
  })
  .state('shell.opportunity', {
    url: '/opportunity',
    abstract: true
  })
  .state('shell.opportunity.detail', {
    url: '/:id?:palette',
    views: {
     'overlay-detail@shell.opportunity.detail': {
        controller: 'OpportunityDetailCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-detail.html'
      },
      'overlay@shell': {
        templateUrl: 'modules/shell/partials/overlay.html',
        controller: 'OverlayDetailCtrl'
      }
    }
  })
  .state('shell.opportunity.detail.edit', {
    url: '/edit',
    views: {
      'overlay@shell': {},
      'overlay-detail@shell.opportunity.detail': {},
      'main@shell': {
        controller: 'OpportunityManageCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-manage.html'
      }
    }
  })
  .state('shell.opportunity.create', {
    url: '/new',
    views: {
      'overlay@shell': {},
      'overlay-detail@shell.opportunity.detail': {},
      'main@shell': {
        controller: 'OpportunityManageCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-manage.html'
      }
    }
  });

  // .state('shell.opportunity.billing', {
  //   url: '/billing',
  //   views: {
  //     'main@shell': {
  //       controller: 'OpportunityBillingCtrl',
  //       templateUrl: 'modules/opportunity/partials/opportunity-billing.html'
  //     }
  //   }
  // });
});
