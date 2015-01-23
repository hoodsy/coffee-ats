'use strict';

angular.module('messaging')
  .factory('UserMatch', function ($rootScope, $resource) {
    return $resource('/api/user/:userId/matches', {
        userId: function() {
          return $rootScope._user._id;
        }
    });
  });
