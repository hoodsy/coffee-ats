'use strict';

angular.module('feed')
  .factory('Feed', function ($rootScope, $resource, apiUrl) {
    return $resource(apiUrl('/users/:userId/feed'), {
        userId: function() {
          return ($rootScope._user && $rootScope._user._id);
        }
    });
  });
