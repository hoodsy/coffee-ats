'use strict';

angular.module('common')
  .factory('Incident', function ($resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/incidents');
  });
