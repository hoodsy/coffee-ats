'use strict';

angular.module('messaging')
  .factory('MatchMessages', function ($rootScope, $resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/matches/:id/messages', { 'id': '@_id' });
  });

