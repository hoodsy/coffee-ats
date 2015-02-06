'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $stateParams, socket, UserMatch, MatchMessages, User) {

    // The ID of the Match entity
    var matchId = $stateParams.id;

    // Reference to user we matched with
    var matchedUser = null;

    // Track the date of the earliest message we have received
    var earliestMsgDate = null;

    // Color palette index
    $scope.palette = 1;

    // Array to hold message objects
    $scope.matchMessages = [];

    // Flag to mark when UI is loading more messages
    $scope.loadingMoreMessages = false;


    // Handlers for message events

    function handleSaveMessage(data) {
      var msg = _.findLast($scope.matchMessages, { _id: data.message._id });
      msg._pending = false;
    }

    function handleMessage(data) {
      if (data.matchId === matchId) {
        $scope.matchMessages.push(data.message);
      } else {
        $scope._user.unreadNotificationsCount += 1;
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

    $scope.loadMessages = function() {
      $scope.loadingMoreMessages = true;
      MatchMessages.query({ untilDate: earliestMsgDate }, function(response) {
        // Extend the beginning of matchMessages with response
        response.unshift(0);
        response.unshift($scope.matchMessages.length);
        $scope.matchMessages.splice.apply($scope.matchMessages, response);

        if ($scope.matchMessages.length > 0) {
          earliestMsgDate = $scope.matchMessages[0].created;
        }

        $scope.loadingMoreMessages = false;
      }, function() {
        $scope.loadingMoreMessages = false;
      });
    };

    // Query past messages in this match
    $scope.loadMessages();

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
