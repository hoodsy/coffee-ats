'use strict';

var app = angular.module('feed');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.feed', {
        url: '/feed?:opId',
        resolve: {
          'feedResource': 'Feed'
        },
        views: {
          'main@shell': {
            templateUrl: 'modules/feed/partials/feed.html',
            controller: 'FeedCtrl'
          }
        }
      })
      .state('shell.feed.user', {
        abstract: true
      })
      .state('shell.feed.user.detail', {
        url: '/users/:id?:palette',
        views: {
          'overlay@shell': {
            templateUrl: 'modules/shell/partials/overlay.html'
          },
          'overlay-main@shell.feed.user.detail': {
            templateUrl: 'modules/shell/partials/overlay-detail.html',
            controller: 'OverlayDetailCtrl'
          },
          'overlay-detail@shell.feed.user.detail': {
            controller: 'UserDetailCtrl',
            templateUrl: 'modules/user/partials/user-detail.html'
          }
        }
      })
      .state('shell.feed.opportunity', {
        abstract: true
      })
      .state('shell.feed.opportunity.detail', {
        url: '/opportunities/:id?:palette',
        views: {
          'overlay@shell': {
            templateUrl: 'modules/shell/partials/overlay.html'
          },
          'overlay-main@shell.feed.opportunity.detail': {
            templateUrl: 'modules/shell/partials/overlay-detail.html',
            controller: 'OverlayDetailCtrl'
          },
          'overlay-detail@shell.feed.opportunity.detail': {
            controller: 'OpportunityDetailCtrl',
            templateUrl: 'modules/opportunity/partials/opportunity-detail.html'
          }
        }
      });
  });
