'use strict';

angular.module('job')
  .controller('JobDashboardCtrl', function ($scope) {
  		$scope.jobsTable = [
  			{title: 'Front End Developer', company: 'Twitter', datePosted: '2013-10-26', numApplicants: 20, isSelected: false },
  			{title: 'Maker of Things', company: 'Yahoo', datePosted: '1990-11-27', numApplicants: 1, isSelected: false },
  			{title: 'Cheese Taster', company: 'Catalina Wine Inc.', datePosted: '2013-07-2', numApplicants: 341, isSelected: false },
  			{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},
  			{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},
  			{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'},{title:'test'}
  		];
  });