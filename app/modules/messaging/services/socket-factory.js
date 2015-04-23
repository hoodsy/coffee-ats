'use strict';

angular.module('messaging')
  .factory('socket', function ($rootScope, $templateCache, notify, User, socketFactory, SOCKETIO_URL) {

    var socket = socketFactory({
      ioSocket: io.connect(SOCKETIO_URL)
    });

    // Play the beep sound
    function beep() {
      $('#beep')[0].play();
    }

    // Play the doopdoop sound
    function doopdoop() {
      $('#doopdoop')[0].play();
    }

    // Increment unreadNotificationsCount
    function addNotification() {
      if ($rootScope._user) {
        $rootScope._user.unreadNotificationsCount += 1;
      }
    }


    /**
     * Handle message event
     */

    var handleMessageCallbacks = [beep, addNotification];

    // Iterates through and calls the callback functions, until
    // one returns true.
    var _handleMessage = function(data) {
      handleMessageCallbacks.some(function(fn) {
        return fn(data);
      });
    };

    socket.on('message', _handleMessage);


    /**
     * Handle match event
     */

    // Display a notification pop-up (toaster)
    function doMatchNotify(data) {
      User.get({ id: data.otherUserId }).$promise
        .then(function(matchedWithUser) {
          var scope = $rootScope.$new();
          scope.msg = data.text;
          scope.matchId = data.matchId;
          scope.userImg = matchedWithUser.picture;

          doopdoop();

          notify({
            message: '',
            messageTemplate: '<div data-ng-include="\'modules/messaging/partials/match-toaster.html\'"></div>',
            position: 'right',
            classes: 'match-toaster',
            duration: 4000,
            scope: scope
          });
        });
    }

    var handleMatchCallbacks = [doMatchNotify];

    // Iterates through and calls the callback functions, until
    // one returns true.
    var _handleMatch = function(data) {
      handleMatchCallbacks.some(function(fn) {
        return fn(data);
      });
    };

    socket.on('match', _handleMatch);


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
          handleMessageCallbacks.unshift(fn);
        }

        return function tearDown() {
          if (fn) {
            handleMessageCallbacks.splice(handleMessageCallbacks.indexOf(fn), 1);
          }
        };
      }
    };
  });
