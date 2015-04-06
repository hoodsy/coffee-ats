'use strict';

angular.module('user')
  .factory('User', function ($http, $resource, apiUrl) {
    return $resource(apiUrl('/users/:id'), { id: '@_id'}, {
      update: { method: 'PUT' }
    });
  });
