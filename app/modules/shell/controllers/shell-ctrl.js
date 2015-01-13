'use strict';

angular.module('shell').controller('ShellCtrl', function ($scope, $cookies, User) {
	$scope.user = User.get({ id: $cookies.userID });
});