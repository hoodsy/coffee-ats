'use strict';

angular.module('user')
  .factory('User', function ($resource) {
    return $resource('/api/user/:id');
  });