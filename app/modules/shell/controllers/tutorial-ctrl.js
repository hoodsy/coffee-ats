'use strict';

angular.module('shell')
  .controller('TutorialCtrl', function ($scope, $rootScope, $state, User) {

    var MAX_PAGES = 2;

    $scope.page = $rootScope.isMobile ? 0 : 1;

    $scope.nextPage = function() {
      $scope.page += 1;
      if ($scope.page >= MAX_PAGES) {
        done();
      }
    };

    function done() {
      var user = $rootScope._user;
      user.tutorialCompleted = true;

      User.update(user).$promise.then(function() {
        return $state.go('shell.feed');
      }).catch(function(err) {
        console.log('ERROR:', err);
      });
    };
  });
