'use strict';

angular.module('user')
  .factory('User', function ($http, $resource) {

    function prependTransform(transform) {
      var defaults = $http.defaults.transformRequest;
      defaults = angular.isArray(defaults) ? defaults : [defaults];
      defaults = defaults.slice();
      defaults.unshift(transform);
      return defaults;
    }

    return $resource('/api/users/:id', { id: '@_id'}, {
      update: {
        method: 'PUT',
        transformRequest: prependTransform(function(value) {
          delete value._id;
          return value;
        })
      }
    });
  });
