'use strict';

angular.module('common')
  .factory('Incident', function ($resource, apiUrl) {
    return $resource(apiUrl('/incidents'));
  });
