'use strict';

angular.module('common')
  .directive('coffeeCard', function($compile, $interpolate) {
    return {
      restrict: 'A',
      controller: function($scope, UserLike) {
        $scope.likeCard = function($event) {
          $event.stopPropagation();
          UserLike.save([{ type: $scope.item.type, id: $scope.item._id }], function() {
            console.log('success');
          }, function(err) {
            console.log('err');
          })
        }
      },
      link: function(scope, element) {
        var e = $interpolate(
          '<div data-{{ item.type }}-card data-model="item" data-like-card="likeCard($event)"></div>')(scope);
        element.append($compile(e)(scope));
      }
    };
});
