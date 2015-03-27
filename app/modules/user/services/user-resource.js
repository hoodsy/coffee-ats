'use strict';

angular.module('user')
  .factory('User', function ($http, $resource) {
    return $resource('/api/users/:id', { id: '@_id'}, {
      update: { method: 'PUT' }
    });
  });
