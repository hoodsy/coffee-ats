'use strict';

angular.module('messaging')
  .factory('MatchMessages', function ($rootScope, $resource, apiUrl) {
    return $resource(apiUrl('/matches/:id/messages'), { 'id': '@_id' });
  });

