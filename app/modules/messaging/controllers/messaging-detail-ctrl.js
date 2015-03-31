'use strict';

angular.module('messaging')
  .controller('MessagingDetailCtrl', function (
      $scope, $state, $stateParams, $timeout, $q,
      socket, UserMatch, MatchMessages, User, DEFAULT_PAGE_SIZE) {

    // The ID of the Match entity
    var matchId = $stateParams.id;

    // Reference to user we matched with
    var matchedUser = null;

    // Track the date of the earliest message we have received
    var earliestMsgDate = null;

    // Track direction of next scroll (1 for up, -1 for down)
    var nextScroll = null;

    // Flag to mark when all messages have been loaded
    $scope.allMessagesLoaded = false;

    // Color palette index
    $scope.palette = 1;

    // Array to hold message objects
    $scope.matchMessages = [];

    // Flag to mark when UI is loading more messages
    $scope.loadingMoreMessages = false;


    // Handler for message events

    function handleMessage(data) {
      if (data.matchId === matchId) {
        $scope.matchMessages.push(data.message);
        nextScroll = -1;
      } else {
        $scope._user.unreadNotificationsCount += 1;
      }
    }

    // Register message handlers with socket service
    var tearDown = socket.registerHandlers(handleMessage);

    // De-register message handlers when we leave the scope
    $scope.$on('$destroy', tearDown);


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

      if ($scope.allMessagesLoaded) {
        var deferred = $q.defer();
        deferred.reject();
        return deferred.promise;
      }

      $scope.loadingMoreMessages = true;

      var promise = MatchMessages.query({
        id: $stateParams.id,
        untilDate: earliestMsgDate
      }).$promise;

      promise.then(function(response) {
        $scope.loadingMoreMessages = false;

        if (response.length < DEFAULT_PAGE_SIZE) {
          nextScroll = null;
          $scope.allMessagesLoaded = true;

        } else {
          // Extend the beginning of matchMessages with response
          response.unshift(0, 0);
          nextScroll = 1;
          if ($scope.matchMessages.length === 0) {
            nextScroll = -1;
          }
          $scope.matchMessages.splice.apply($scope.matchMessages, response);
          earliestMsgDate = $scope.matchMessages[0].created;
        }
      }).catch(function() {
        $scope.loadingMoreMessages = false;
      });

      return promise;
    };

    // Query past messages in this match
    (function next() {
      if ($(".messaging-detail-well").scrollTop() !== 0
          || $scope.allMessagesLoaded) {
        return;
      }
      nextScroll = -1;
      $scope.loadMessages().then(function() {
        $timeout(next);
      });
    })();

    $scope.sendMessage = function() {

      var date = (new Date()).toISOString();
      var senderId = $scope._user._id;
      var recipientId = matchedUser._id;
      var messageText = $scope.messageText;

      var message = {
        // _id: btoa(date+messageText+senderId+recipientId),
        senderId: senderId,
        senderName: $scope._user.firstName,
        recipientId: recipientId,
        text: messageText,
        created: date
      };

      var data = {
        matchId: $scope.match._id,
        message: message
      };

      message._pending = true;
      nextScroll = -1;
      $scope.matchMessages.push(message);

      socket.sendMessage(data, function(err) {
        message._pending = false;

        if (err) {
          // On error, remove pending message from array
          console.log('ERROR:', err);
          $scope.matchMessages.splice($scope.matchMessages.indexOf(message), 1);
        } else {
          // On success, clear the input
          $scope.messageText = '';
        }
      });
    };

    $scope.delete = function(matchId) {
      $scope.$parent.delete(matchId).then(function() {
        $state.go('^');
      });
    };
  });
