'use strict';

angular.module('job')
  .factory('Job', function ($resource) {
    return $resource('/api/job/:id');
  })
  .factory('getJobList', function($resource){
  	return $resource('/api/user/:id/job');
  })
  .factory('getJob', function($resource){
  	return $resource('/api/job/:id');
  });
  