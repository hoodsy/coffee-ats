'use strict';

angular.module('user')
  .controller('UserDetailEditCtrl', function ($scope, $rootScope, $state, $stateParams, User) {

    var MAX_EXPERIENCE = 3;
    var MAX_EDUCATION = 3;

    $scope.palette = $stateParams.palette || '1';
    $scope.user = User.get({ id: $stateParams.id });

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
      user.$update({}, function(response) {
        $state.go('^');
      }, function(response) {
        console.log('error');
      });
    };

  });
