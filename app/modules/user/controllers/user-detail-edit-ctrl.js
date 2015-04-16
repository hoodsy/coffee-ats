'use strict';

angular.module('user')
  .controller('UserDetailEditCtrl', function ($scope, $rootScope, $state, $stateParams, $timeout, User, userHelper, USER_CONFIG) {

    var MAX_EXPERIENCE = 3;
    var MAX_EDUCATION = 3;

    $scope.config = USER_CONFIG;

    $scope.palette = $stateParams.palette || '1';
    $scope.isSetup = /setup/.test($state.current.name);

    // User and user sub objects used in view
    $scope.user = null;
    $scope.experiences = [];
    $scope.educations = [];

    function getTimes(item) {
      item = _.clone(item);
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

      return item;
    }

    function setTimes(item) {
      item.startTime = '';
      item.endTime = '';
      if (item._startMonth && item._startYear) {
        item.startTime = new Date(Date.UTC(item._startYear, item._startMonth - 1));
      }
      if (item._endMonth && item._endYear) {
        item.endTime = new Date(Date.UTC(item._endYear, item._endMonth - 1));
      }

      // Return the object without any private keys
      item = _.clone(item);
      Object.keys(item).forEach(function(key) {
        if (key.charAt(0) === '_') {
          delete item[key];
        }
      });

      return item;
    }

    User.get({ id: $stateParams.id }, function(user) {

      $scope.user = user;

      // Set up experiences and educations
      $scope.experiences = _.map(user.experiences, getTimes);
      $scope.educations = _.map(user.educations, getTimes);

      // Because backend supports array of locations but UI only has single input
      if (user.locations.length > 0) {
        user._location = user.locations[0];
      }
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
      return ($scope.experiences &&
              $scope.experiences.length < MAX_EXPERIENCE);
    };

    // Add an experience slot to user object
    $scope.addExperience = function(user) {
      if ($scope.canAddExperience(user)) {
        $scope.experiences.push({
          organization: '',
          position: '',
          time: ''
        });
      }
    };

    // Remove an experience by index number (0-indexed)
    $scope.deleteExeperience = function(user, index) {
      $scope.experiences.splice(index, 1);
    };

    $scope.canAddEducation = function(user) {
      return ($scope.educations &&
              $scope.educations.length < MAX_EDUCATION);
    };

    // Add an education slot to user object
    $scope.addEducation = function(user) {
      if ($scope.canAddEducation(user)) {
        $scope.educations.push({
          school: '',
          major: '',
          degree: '',
          time: ''
        });
      }
    };

    // Remove an education by index number (0-indexed)
    $scope.deleteEducation = function(user, index) {
      $scope.educations.splice(index, 1);
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
      user.locations = [user._location];

      user.educations = $scope.educations.map(setTimes);
      user.experiences = $scope.experiences.map(setTimes);

      var userId = user._id;

      User.update(user).$promise.then(function() {
        return User.get({ id: userId }).$promise;
      })
      .then(function(user) {
        $scope.user = $rootScope._user = userHelper.checkNeedsSetup(user);
      })
      /**
       * Redirect first to feed, then to user detail.
       * This way if user "clicks out" of the detail, he will return to the
       * feed (since he is returned to the previous location). Use of
       * $timeout is necessary so the state changes occur in separate digest
       * cycles.
       */
      .then(function() {
        return $state.go('shell.feed');
      })
      .then(function() {
        $timeout(function() {
          $state.go('shell.user.detail', { id: userId });
        });
      })
      .catch(function(err) {
        console.log('ERROR:', err);
      });
    };

  });
