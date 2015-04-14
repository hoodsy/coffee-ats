'use strict';

angular.module('shell')
  .controller('OverlayDetailCtrl', function ($scope, $window) {
    $scope.dismiss = function($event) {
      $event.stopPropagation();
      $window.history.back();
    };
  });
