'use strict';

angular.module('common')
  .controller('CoffeeCardCtrl', function ($scope, UserLike) {
    $scope.likeCard = function($event) {
      $event.stopPropagation();
      $scope.item._action = 'liked';
      UserLike.save([{ type: $scope.item.type, id: $scope.item._id }], function() {
        console.log('success');
      }, function(err) {
        // delete $scope.item._action;
        console.log('err');
      })
    };
  });
