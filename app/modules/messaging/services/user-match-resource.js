'use strict';

angular.module('messaging')
  .factory('UserMatch', function ($rootScope, $resource, apiUrl) {
    return $resource(apiUrl('/users/:userId/matches/:id'), {
      id: '@_id',
      userId: function() {
        return ($rootScope._user && $rootScope._user._id);
      }
    });
  });
