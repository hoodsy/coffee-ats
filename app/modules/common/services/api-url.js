'use strict';

angular.module('common')
  .factory('apiUrl', function (API_ROOT_URL) {
    return function(path) {
        var c1 = API_ROOT_URL.charAt(API_ROOT_URL.length-1);
        var c2 = path.charAt(0);
        if (c1 !== '/' && c2 !== '/') {
          return [API_ROOT_URL, path].join('/');
        } else if (c1 === '/' && c2 === '/') {
          return API_ROOT_URL + path.substring(1);
        }
        return API_ROOT_URL + path;
    };
  });
