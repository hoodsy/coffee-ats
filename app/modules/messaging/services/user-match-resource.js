'use strict';

angular.module('messaging')
  .factory('UserMatch', function ($rootScope, $resource) {
    return $resource('/api/users/:userId/matches/:id', { 'id': '@_id' }, {
        userId: function() {
          return $rootScope._user._id;
        }
    });
  });
