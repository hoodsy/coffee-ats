'use strict';

angular.module('feed')
  .factory('Feed', function ($rootScope, $resource) {
    return $resource('/api/user/:userId/feed', {
        userId: function() {
          return $rootScope._user.id;
        }
    });
  });