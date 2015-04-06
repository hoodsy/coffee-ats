'use strict';

angular.module('common')
  .factory('UserLike', function ($rootScope, $resource, apiUrl) {
    return $resource(apiUrl('/users/:userId/likes'), {
        userId: function() {
          return ($rootScope._user && $rootScope._user._id);
        }
    });
  });
