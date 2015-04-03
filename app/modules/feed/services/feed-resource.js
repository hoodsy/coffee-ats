'use strict';

angular.module('feed')
  .factory('Feed', function ($rootScope, $resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/users/:userId/feed', {
        userId: function() {
          return ($rootScope._user && $rootScope._user._id);
        }
    });
  });
