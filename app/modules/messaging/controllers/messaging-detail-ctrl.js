'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $stateParams, socket, UserMatch, MatchMessages, User) {

    var matchId = $stateParams.id;

    function handleSaveMessage(data) {
      var msg = _.findLast($scope.matchMessages, { _id: data.message._id });
      msg._pending = false;
    }

    function handleMessage(data) {
      if (data.matchId === matchId) {
        $scope.matchMessages.push(data.message);
      } else {
        $scope._user.unreadNotifications += 1;
      }
    }

    socket.on('saved', handleSaveMessage);
    socket.on('message', handleMessage);

    var matchedUser = null;

    $scope.palette = 1;

    UserMatch.get({ id: matchId }, function(response) {
      $scope.match = response;

      matchedUser = _.find($scope.match.users, function(user) {
        return (user._id !== $scope._user._id);
      });

      $scope.user = User.get({id: matchedUser._id });
    });

    $scope.matchMessages = [];
    MatchMessages.query(function(response) {
      $scope.matchMessages = response;
    });

    $scope.sendMessage = function() {

      var date = (new Date()).toISOString();
      var senderId = $scope._user._id;
      var recipientId = matchedUser._id;
      var messageText = $scope.messageText;

      var message = {
        _id: btoa(date+messageText+senderId+recipientId),
        senderId: senderId,
        senderName: $scope._user._firstName,
        recipientId: recipientId,
        text: messageText,
        created: date
      };

      var data = {
        matchId: $scope.match._id,
        message: message
      };

      socket.emit('message', data);

      message._pending = true;
      $scope.matchMessages.push(message);
      $scope.messageText = '';
    };
  });
