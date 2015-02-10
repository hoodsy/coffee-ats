'use strict';

angular.module('user')
  .factory('UserOpportunities', function ($rootScope, $resource) {
    return $resource('/api/users/:userId/opportunities', {
      userId: function() {
        return $rootScope._user._id;
      }
    });
  });
