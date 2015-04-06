'use strict';

angular.module('user')
  .factory('UserOpportunities', function ($rootScope, $resource, apiUrl) {
    return $resource(apiUrl('/users/:userId/opportunities'), {
      userId: function() {
        return ($rootScope._user && $rootScope._user._id);
      }
    });
  });
