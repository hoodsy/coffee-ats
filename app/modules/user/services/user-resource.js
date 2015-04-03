'use strict';

angular.module('user')
  .factory('User', function ($http, $resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/users/:id', { id: '@_id'}, {
      update: { method: 'PUT' }
    });
  });
