'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope, socketFactory, SOCKETIO_URL) {

    var socket = socketFactory({
      ioSocket: io.connect(SOCKETIO_URL)
    });

    socket.emit('join', { userId: $rootScope._user._id });

    function beep() {
      $("#beep").play();
    }

    // Handlers registered by other code
    var handleSaveMessage = [];
    var handleMessage = [beep];

    // Private handlers always called
    var _handleSaveMessage = function(data) {
      handleSaveMessage.forEach(function(fn) {
        fn(data);
      });
    };

    var _handleMessage = function(data) {
      if (handleMessage.length) {
        handleMessage.forEach(function(fn) {
          fn(data);
        });
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
        if (saveFn) {
          handleSaveMessage.push(saveFn);
        }

        if (fn) {
          handleMessage.push(fn);
        }

        return function tearDown() {
          if (saveFn) {
            handleSaveMessage.splice(handleSaveMessage.indexOf(saveFn), 1);
          }

          if (fn) {
            handleMessage.splice(handleMessage.indexOf(fn), 1);
          }
        }
      }
    };
  });
