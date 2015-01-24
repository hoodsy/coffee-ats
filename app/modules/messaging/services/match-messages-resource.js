'use strict';

angular.module('messaging')
  .factory('MatchMessages', function ($rootScope, $resource) {
    return $resource('/api/matches/:id/messages', { 'id': '@_id' });
  });

