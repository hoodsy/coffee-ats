'use strict';

angular.module('user')
  .factory('UserOpportunities', function ($rootScope, $resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/users/:userId/opportunities', {
      userId: function() {
        return ($rootScope._user && $rootScope._user._id);
      }
    });
  });
