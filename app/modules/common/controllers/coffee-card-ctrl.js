'use strict';

angular.module('common')
  .controller('CoffeeCardCtrl', function ($scope, UserLike) {

    $scope.likeCard = function($event) {
      $event.stopPropagation();
      $scope.item._cssClass = 'like-slide';

      UserLike.save([{ type: $scope.item.type, id: $scope.item._id }], function() {

        console.log('success');
      }, function(err) {
        $scope.item._liked = true;
        console.log('err');
      })
    };

    $scope.askDelete = function() {
      $scope.item._cssClass = 'ask-delete-slide';
      $scope.item._askDelete = true;
    };
  });
