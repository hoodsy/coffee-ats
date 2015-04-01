'use strict';

angular.module('feed')
  .controller('FeedCtrl', function ($scope, $stateParams, feedResource, DEFAULT_PAGE_SIZE) {

    // Flag for when more feed items are being loaded
    $scope.loadingMoreFeed = false;

    // Track the last page of feed we retrieved
    var feedPage = 1;

    // Flag to mark when all feed items have been loaded
    $scope.allFeedLoaded = false;

    // Feed items container
    $scope.feed = [];

    $scope.loadFeed = function() {
      if ($scope.allFeedLoaded) {
        return;
      }

      $scope.loadingMoreFeed = true;

      feedResource.query({
        page: feedPage,
        opportunity_id: $stateParams.op_id
      }, function(response) {
        $scope.loadingMoreFeed = false;

        // No more items to load
        if (response.length < DEFAULT_PAGE_SIZE) {
          $scope.allFeedLoaded = true;
        }

        // Extend the end of feed with response
        if (response.length > 0) {
          response.unshift($scope.feed.length, 0);
          $scope.feed.splice.apply($scope.feed, response);
          feedPage += 1;
        }

      }, function(err) {
        $scope.loadingMoreFeed = false;
        console.log('ERROR:', err);
      });
    };

    $scope.loadFeed();
  });
