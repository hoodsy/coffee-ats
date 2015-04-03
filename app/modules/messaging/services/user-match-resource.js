'use strict';

angular.module('messaging')
  .factory('UserMatch', function ($rootScope, $resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/users/:userId/matches/:id', {
      id: '@_id',
      userId: function() {
        return ($rootScope._user && $rootScope._user._id);
      }
    });
  });
