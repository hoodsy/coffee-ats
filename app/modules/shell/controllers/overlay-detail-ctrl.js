'use strict';

angular.module('shell')
  .controller('OverlayDetailCtrl', function ($scope, $state) {
    $scope.dismiss = function($event) {
      var stateList = ['^'];
      while ($state.get(stateList.join('.')).abstract) {
        stateList.push('^');
      }
      $state.go(stateList.join('.'));
    };
  });
