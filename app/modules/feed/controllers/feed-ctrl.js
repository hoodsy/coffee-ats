'use strict';

angular.module('feed')
  .controller('FeedCtrl', function ($scope, Feed) {
    Feed.query(function(response) {
      $scope.feed = response;
    });
  });
