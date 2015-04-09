'use strict';

angular.module('shell')
  .controller('OverlayDetailCtrl', function ($scope, $state, $timeout) {
    $scope.dismiss = function($event) {
      $event.stopPropagation();
      var stateList = ['^'];
      while ($state.get(stateList.join('.')).abstract) {
        stateList.push('^');
      }
      $state.go(stateList.join('.'));
    };
  });
