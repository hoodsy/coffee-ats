'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope, socketFactory) {

    var socket = io.connect('http://localhost:4000');
    socket.emit('join', { userId: $rootScope._user._id });

    return socketFactory({
      ioSocket: socket
    });
  });
