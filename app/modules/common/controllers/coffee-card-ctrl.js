'use strict';

angular.module('common')
  .controller('CoffeeCardCtrl', function ($scope, UserLike) {
    $scope.likeCard = function($event) {
      $event.stopPropagation();
      UserLike.save([{ type: $scope.item.type, id: $scope.item._id }], function() {
        console.log('success');
      }, function(err) {
        console.log('err');
      })
    };
  });
