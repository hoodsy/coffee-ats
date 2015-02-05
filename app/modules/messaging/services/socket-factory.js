'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope) {

    var socket = io.connect('http://localhost:4000');
    socket.emit('join', { userId: $rootScope._user._id });

    // Handlers registered by other code
    var handleSaveMessage = null;
    var handleMessage = null;

    // Private handlers always called
    var _handleSaveMessage = function() {
      if (handleSaveMessage) {
        handleSaveMessage();
      }
    };

    var _handleMessage = function() {
      if (handleMessage) {
        handleMessage();
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

      registerHandlers: function (handleSaveMessage, handleMessage) {
        handleSaveMessage = handleSaveMessage;
        handleMessage = handleMessage;
      },

      tearDown: function() {
        handleSaveMessage = null;
        handleMessage = null;
      }
    };
  });
