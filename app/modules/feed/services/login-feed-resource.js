'use strict';

angular.module('feed')
  .factory('LoginFeed', function ($resource, apiUrl) {
    return $resource(apiUrl('/feed'));
  });
