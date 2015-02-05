'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $stateParams, socket, UserMatch, MatchMessages, User) {

    // The ID of the Match entity
    var matchId = $stateParams.id;

    // Reference to user we matched with
    var matchedUser = null;

    // Color palette index
    $scope.palette = 1;


    // Handlers for message events

    function handleSaveMessage(data) {
      var msg = _.findLast($scope.matchMessages, { _id: data.message._id });
      msg._pending = false;
    }

    function handleMessage(data) {
      if (data.matchId === matchId) {
        $scope.matchMessages.push(data.message);
      }
    }

    // Register message handlers with socket service
    socket.registerHandlers(handleSaveMessage, handleMessage);

    // De-register message handlers when we leave the scope
    $scope.$on('$destroy', socket.tearDown);


    // Query the Match entity
    UserMatch.get({ id: matchId }, function(response) {
      $scope.match = response;

      matchedUser = _.find($scope.match.users, function(user) {
        return (user._id !== $scope._user._id);
      });

      $scope.user = User.get({id: matchedUser._id });
    });

    // Query past messages in this match
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

      socket.sendMessage(data);

      message._pending = true;
      $scope.matchMessages.push(message);
      $scope.messageText = '';
    };
  });
