'use strict';

var app = angular.module('feed');

app.config(function ($stateProvider) {
    $stateProvider
      .state('shell.feed', {
        url: '/feed?:op_id',
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
          'main@shell': {
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
          'main@shell': {
            controller: 'OpportunityDetailCtrl',
            templateUrl: 'modules/opportunity/partials/opportunity-detail.html'
          }
        }
      });
  });
