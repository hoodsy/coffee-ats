'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope, socketFactory, SOCKETIO_URL) {

    var socket = socketFactory({
      ioSocket: io.connect(SOCKETIO_URL)
    });

    socket.emit('join', { userId: $rootScope._user._id });

    // Handlers registered by other code
    var handleSaveMessage = null;
    var handleMessage = null;

    // Private handlers always called
    var _handleSaveMessage = function(data) {
      if (handleSaveMessage) {
        handleSaveMessage(data);
      }
    };

    var _handleMessage = function(data) {
      if (handleMessage) {
        handleMessage(data);
      } else {
        $rootScope._user.unreadNotificationsCount += 1;
      }
    };

    socket.on('saved', _handleSaveMessage);
    socket.on('message', _handleMessage);

    var sendMessage = function(data) {
      socket.emit('message', data);
    };

    return {
      sendMessage: sendMessage,

      registerHandlers: function (saveFn, fn) {
        handleSaveMessage = saveFn;
        handleMessage = fn;
      },

      tearDown: function() {
        handleSaveMessage = null;
        handleMessage = null;
      }
    };
  });
