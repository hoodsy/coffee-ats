'use strict';

angular.module('common')
  .factory('UserLike', function ($rootScope, $resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/users/:userId/likes', {
        userId: function() {
          return ($rootScope._user && $rootScope._user._id);
        }
    });
  });
