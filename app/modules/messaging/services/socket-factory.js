'use strict';

angular.module('messaging')
  .factory('socket', function (socketFactory) {
    return socketFactory({
      ioSocket: io.connect('http://localhost:4000')
    });
  });
