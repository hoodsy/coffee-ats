'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope, socketFactory, SOCKETIO_URL) {

    var socket = socketFactory({
      ioSocket: io.connect(SOCKETIO_URL)
    });

    console.log($rootScope._user._id);
    socket.emit('join', { userId: $rootScope._user._id });

    function beep() {
      $("#beep")[0].play();
    }

    // Handlers registered by other code
    var handleMessage = [beep];


    var _handleMessage = function(data) {
      if (handleMessage.length) {
        handleMessage.forEach(function(fn) {
          fn(data);
        });
      } else {
        $rootScope._user.unreadNotificationsCount += 1;
      }
    };

    socket.on('message', _handleMessage);

    var sendMessage = function(data, fn) {
      socket.emit('message', data, fn);
    };

    return {
      sendMessage: sendMessage,

      registerHandlers: function (fn) {
        if (fn) {
          handleMessage.push(fn);
        }

        return function tearDown() {
          if (fn) {
            handleMessage.splice(handleMessage.indexOf(fn), 1);
          }
        }
      }
    };
  });
