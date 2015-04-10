'use strict';

angular.module('user')
  .controller('UserDetailEditCtrl', function ($scope, $rootScope, $state, $stateParams, User) {

    var MAX_EXPERIENCE = 3;
    var MAX_EDUCATION = 3;

    $scope.palette = $stateParams.palette || '1';

    function getTimes(item) {
      var date;
      if (item.startTime) {
        date = new Date(item.startTime);
        item._startYear = date.getUTCFullYear();
        item._startMonth = date.getUTCMonth() + 1;
      }
      if (item.endTime) {
        date = new Date(item.endTime);
        item._endYear = date.getUTCFullYear();
        item._endMonth = date.getUTCMonth() + 1;
      }
    }

    function setTimes(item) {
      item.startTime = '';
      item.endTime = '';
      if (item._startMonth && item._startYear) {
        item.startTime = new Date(Date.UTC(item._startYear, item._startMonth - 1));
        delete item._startMonth;
        delete item._startYear;
      }
      if (item._endMonth && item._endYear) {
        item.endTime = new Date(Date.UTC(item._endYear, item._endMonth - 1));
        delete item._endMonth;
        delete item._endYear;
      }
    }

    $scope.user = User.get({ id: $stateParams.id }, function(user) {

      // Because backend supports array of locations but UI only has single input
      if (user.locations.length > 0) {
        user.location = user.locations[0];
      }

      user.educations.forEach(getTimes);
      user.experiences.forEach(getTimes);
    });

    $scope.suggestedTags = [
      'engineer',
      'business',
      'sales',
      'data',
      'designer',
      'marketing',
      'product',
      'media',
      'investor',
      'strategist',
      'human resources',
      'education',
      'finance',
      'operations',
      'law'
    ];

    $scope.newTag = '';

    // On mobile views we split edit form across multiple pages
    $scope.page = 0;

    $scope.previousPage = function() {
      $scope.page -= 1;
    };

    $scope.nextPage = function() {
      $scope.page += 1;
    };

    // Only logged in user may edit their own profile
    $scope.isEditable = function(user) {
      if ($rootScope._user && user) {
        return $rootScope._user._id === user._id;
      }
    };

    $scope.canAddExperience = function(user) {
      return (user.experiences &&
              user.experiences.length < MAX_EXPERIENCE);
    };

    // Add an experience slot to user object
    $scope.addExperience = function(user) {
      if ($scope.canAddExperience(user)) {
        user.experiences.push({
          organization: '',
          position: '',
          time: ''
        });
      }
    };

    // Remove an experience by index number (0-indexed)
    $scope.deleteExeperience = function(user, index) {
      user.experiences.splice(index, 1);
    };

    $scope.canAddEducation = function(user) {
      return (user.educations &&
              user.educations.length < MAX_EDUCATION);
    };

    // Add an education slot to user object
    $scope.addEducation = function(user) {
      if ($scope.canAddEducation(user)) {
        user.educations.push({
          school: '',
          major: '',
          degree: '',
          time: ''
        });
      }
    };

    // Remove an education by index number (0-indexed)
    $scope.deleteEducation = function(user, index) {
      user.educations.splice(index, 1);
    };

    // Add a tag to the user's tags
    $scope.addTag = function(user, tag) {
      if (user.tags.indexOf(tag) === -1) {
        user.tags.push(tag);
      }
      $scope.newTag = '';
    };

    // Remove a tag by index number (0-indexed)
    $scope.deleteTag = function(user, index) {
      user.tags.splice(index, 1);
    };

    $scope.save = function(user) {
      if (Object.keys($scope.editForm.$error).length > 0) {
        return;
      }

      // Because backend supports array of locations but UI only has single input
      user.locations = [user.location];
      delete user.location;

      user.educations.forEach(setTimes);
      user.experiences.forEach(setTimes);

      user.$update({}, function() {
        $state.go('^');
      }, function(err) {
        console.log('ERROR:', err);
      });
    };

  });
