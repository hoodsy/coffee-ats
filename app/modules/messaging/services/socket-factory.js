'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope, socketFactory, SOCKETIO_URL) {

    var socket = socketFactory({
      ioSocket: io.connect(SOCKETIO_URL)
    });

    // Play the beep sound
    function beep() {
      $("#beep")[0].play();
    }

    function addNotification() {
      if ($rootScope._user) {
        $rootScope._user.unreadNotificationsCount += 1;
      }
    }

    // Handlers registered by other code
    var handleMessage = [beep, addNotification];

    var _handleMessage = function(data) {
      handleMessage.forEach(function(fn) {
        fn(data);
      });
    };

    socket.on('message', _handleMessage);


    function init() {
      socket.emit('join', { userId: $rootScope._user._id });
    }

    var sendMessage = function(data, fn) {
      socket.emit('message', data, fn);
    };

    var sendRead = function(matchId, fn) {
      socket.emit('read', {matchId: matchId}, fn);
    };

    return {
      init: init,

      sendMessage: sendMessage,

      sendRead: sendRead,

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
