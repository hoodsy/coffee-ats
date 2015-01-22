'use strict';

var app = angular.module('common');

app.config(function ($stateProvider) {
    $stateProvider
      .state('styleguide', {
        url: '/styleguide',
        templateUrl: 'modules/common/partials/styleguide.html'
      });
  });
