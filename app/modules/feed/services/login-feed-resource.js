'use strict';

angular.module('feed')
  .factory('LoginFeed', function ($resource) {
    return $resource('/api/feed');
  });
