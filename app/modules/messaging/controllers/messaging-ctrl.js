'use strict';

angular.module('messaging')
  .controller('MessagingCtrl', function (
    $scope, $modal, $state, $stateParams, $q, socket, UserMatch, Incident, DEFAULT_PAGE_SIZE) {

    // Flag to activate match controls
    $scope.canShowControls = -1;

    // Flag for when more matches are being loaded
    $scope.loadingMoreMatches = false;

    // Track the date of the earliest matches we have received
    var earliestMatchDate = null;

    // Flag to mark when all matches have been loaded
    $scope.allMatchesLoaded = false;

    // Array to hold opportunity objects
    $scope.matches = [];


    $scope.loadMatches = function(reload) {
      if ($scope.allMatchesLoaded) {
        return;
      }

      $scope.loadingMoreMatches = true;

      var request = UserMatch.query({
        after: earliestMatchDate,
        opportunity_id: $stateParams.opId
      }, function(response) {
        $scope.loadingMoreMatches = false;

        if (reload) {
          $scope.matches.splice(0, $scope.matches.length);
        }

        // No more items to load
        if (response.length < DEFAULT_PAGE_SIZE) {
          $scope.allMatchesLoaded = true;
        }

        // Extend the end of matches with response
        if (response.length > 0) {
          response.unshift($scope.matches.length, 0);
          $scope.matches.splice.apply($scope.matches, response);
          earliestMatchDate = $scope.matches[$scope.matches.length-1].updated;
        }

        // Iterate through the matches and assign the proper palette

        var opportunityCount = 0;
        var userCount = 0;

        $scope.matches.forEach(function(match) {
          if (match.opportunities.length > 0) {
            opportunityCount = (opportunityCount + 1) % 3;
            match._palette = opportunityCount;
            match._paletteClass = 'opportunity';
          } else {
            userCount = (userCount + 1) % 5;
            match._palette = userCount;
            match._paletteClass = 'user';
          }
        });

        // Open up the first match already
        if ($scope.isDesktop &&
            $scope.matches.length &&
            !/detail$/.test($state.current.name)) {
          $state.go('shell.messaging.main.detail', { id: $scope.matches[0]._id });
        }
      });

      return request.$promise;
    };

    $scope.loadMatches().then(function() {
      // Clear unread notifications when user loads matches 1st time
      $scope._user.unreadNotificationsCount = 0;
    });

    function reloadMatches() {
      earliestMatchDate = null;
      $scope.allMatchesLoaded = false;
      $scope.loadMatches(true);
    }

    // Register message handlers with socket service
    var tearDown = socket.registerHandlers(reloadMatches);

    // De-register message handlers when we leave the scope
    $scope.$on('$destroy', tearDown);


    $scope.toggleControls = function(index) {
      if ($scope.canShowControls === index) {
        $scope.canShowControls = -1;
      } else {
        $scope.canShowControls = index;
      }
    };

    $scope.enableControls = function(index) {
      $scope.canShowControls = index;
    };

    $scope.disableControls = function(index) {
      if ($scope.canShowControls === index) {
        $scope.canShowControls = -1;
      }
    };

    $scope.showControls = function(index) {
      return ($scope.canShowControls === index);
    };

    // Mark match as read
    $scope.markRead = function(matchId) {
      var match = _.find($scope.matches, { _id: matchId });
      if (match) {
        match.unread = false;
      }
    };

    // Launch Report modal
    $scope.report = function(match) {
      var scope = $scope.$new();
      scope.message = 'Report?';

      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      modalInstance.result.then(function() {

        var matchedUser = _.find(match.users, function(user) {
          return (user._id !== $scope._user._id);
        });

        Incident.save({
          reporterId: $scope._user._id,
          reportedId: matchedUser._id,
          matchId: match._id
        }, function() {}, function(err) {
          console.log('ERROR', err);
        });
      }).finally(function() {
        modalInstance.dismiss();
      });
    };

    // Launch Delete modal
    $scope.delete = function(matchId, $index) {
      var scope = $scope.$new();
      scope.message = 'Delete?';

      var modalInstance = $modal.open({
        templateUrl: 'modules/common/partials/prompt-modal.html',
        scope: scope,
        size: 'sm'
      });

      // Handle affirmative response
      return modalInstance.result.then(function() {
        var deferred = $q.defer();

        UserMatch.delete({ id: matchId }, function() {
          $scope.canShowControls = -1;
          $scope.matches.splice($index, 1);
          deferred.resolve();
        }, function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }).finally(function() {
        modalInstance.dismiss();
      });
    };
  });
