'use strict';

angular.module('feed')
  .controller('FeedCtrl', function ($scope, $stateParams, Feed) {
    Feed.query({
      opportunity_id: $stateParams.op_id
    },function(response) {
      $scope.feed = response;
    });
  });
