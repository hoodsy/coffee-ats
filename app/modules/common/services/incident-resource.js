'use strict';

angular.module('common')
  .factory('Incident', function ($resource) {
    return $resource('/api/incidents');
  });
