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
      'overlay@shell': {
        templateUrl: 'modules/shell/partials/overlay.html'
      },
      'overlay-main@shell.opportunity.detail': {
        templateUrl: 'modules/shell/partials/overlay-detail.html',
        controller: 'OverlayDetailCtrl'
      },
      'overlay-detail@shell.opportunity.detail': {
        controller: 'OpportunityDetailCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-detail.html'
      }
    }
  })
  .state('shell.opportunity.detail.edit', {
    url: '/edit',
    views: {
      'main@shell': {
        controller: 'OpportunityManageCtrl',
        templateUrl: 'modules/opportunity/partials/opportunity-manage.html'
      },
      'overlay@shell': {}
    }
  })
  .state('shell.opportunity.create', {
    url: '/new',
    views: {
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
