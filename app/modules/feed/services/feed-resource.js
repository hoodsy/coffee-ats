'use strict';

angular.module('feed')
  .factory('Feed', function ($rootScope, $resource) {
    return $resource('/api/users/:userId/feed', {
        userId: function() {
          return $rootScope._user._id;
        }
    });
  });
