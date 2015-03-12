'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function ($scope, $state, $stateParams, socket, UserMatch, MatchMessages, User) {

    // The ID of the Match entity
    var matchId = $stateParams.id;

    // Reference to user we matched with
    var matchedUser = null;

    // Track the date of the earliest message we have received
    var earliestMsgDate = null;

    // Track direction of next scroll (1 for up, -1 for down)
    var nextScroll = null;

    // Flag to mark when all messages have been loaded
    var allMessagesLoaded = false;

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
      nextScroll = -1;
    }

    function handleMessage(data) {
      if (data.matchId === matchId) {
        $scope.matchMessages.push(data.message);
        nextScroll = -1;
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

      // check if match exists in the parent scope
      var parentMatch = _.find($scope.$parent.matches, { _id: matchId });
      if (parentMatch) {
        $scope.match._palette = parentMatch._palette;
        $scope.match._paletteClass = parentMatch._paletteClass;
      }
    });

    // Handle loading new or old messages
    $scope.onHeightChange = function() {
      return nextScroll;
    };

    $scope.loadMessages = function() {

      if (allMessagesLoaded) {
        return;
      }

      $scope.loadingMoreMessages = true;

      MatchMessages.query({
        id: $stateParams.id,
        untilDate: earliestMsgDate
      }, function(response) {
        $scope.loadingMoreMessages = false;

        if (response.length === 0) {
          nextScroll = null;
          allMessagesLoaded = true;

        } else {
          // Extend the beginning of matchMessages with response
          response.unshift(0, 0);
          $scope.matchMessages.splice.apply($scope.matchMessages, response);
          earliestMsgDate = $scope.matchMessages[0].created;
          nextScroll = 1;
        }

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
      nextScroll = -1;
      message._pending = true;
      $scope.matchMessages.push(message);
      $scope.messageText = '';
    };

    $scope.delete = function(matchId) {
      $scope.$parent.delete(matchId).then(function() {
        $state.go('^');
      });
    };
  });
