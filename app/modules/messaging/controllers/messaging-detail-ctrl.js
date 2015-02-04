'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $stateParams, socket, UserMatch, MatchMessages, User) {

    socket.emit('join', { userId: $scope._user._id });

    function handleMessage(data) {
      var msg = _.findLast($scope.matchMessages, {
        senderId: data.sender,
        text: data.text,
        created: data.created
      });
      msg._pending = false;
    }

    socket.on('saved', handleMessage);
    socket.on('message', handleMessage);

    var matchedUser = null;

    $scope.palette = 1;

    UserMatch.get({ id: $stateParams.id }, function(response) {
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

      var data = {
        matchId: $scope.match._id,
        sender: $scope._user._id,
        recipient: matchedUser._id,
        firstname: $scope._user.firstname,
        lastname: $scope._user.lastname,
        text: $scope.messageText,
        created: (new Date()).toISOString()
      };

      $scope.matchMessages.push({
        senderId: data.sender,
        senderName: data.firstname,
        text: data.text,
        created: data.created,
        _pending: true
      });

      socket.emit('message', data);

      $scope.messageText = '';
    };
  });
