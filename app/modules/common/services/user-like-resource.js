'use strict';

angular.module('common')
  .factory('UserLike', function ($rootScope, $resource) {
    return $resource('/api/users/:userId/likes', {
        userId: function() {
          return $rootScope._user._id;
        }
    });
  });
