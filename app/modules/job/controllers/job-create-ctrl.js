'use strict';

angular.module('job')
  .controller('JobCreateCtrl', function ($scope, $state, $stateParams, Job) {

  	$scope.postJob = function() {
  		var newJob = new Job($scope.job);
  		newJob.$save();
  		$state.go('home.job.billing');
  	}
  
  });