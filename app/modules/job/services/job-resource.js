'use strict';

angular.module('job')
  .factory('Job', function ($resource) {
    return $resource('/api/job/:id');
  });