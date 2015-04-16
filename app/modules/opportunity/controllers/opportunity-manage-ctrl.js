'use strict';

angular.module('opportunity')
  .controller('OpportunityManageCtrl', function ($scope, $state, $stateParams, $q, $timeout, Opportunity, apiUrl) {

    $scope.palette = $stateParams.palette || '1';

    // Placeholder for new tag input
    $scope.newTag = '';

    // Available schedule types
    $scope.schedules = ['Full-time', 'Part-time', 'Other'];

    // On mobile views we split edit form across multiple pages
    $scope.page = 0;

    // DOM element id for file input
    $scope.fileUploadId = 'image-upload';

    var editing = false;
    if ($stateParams.id) {
      editing = true;
    }

    // Initialize operations for create/edit
    $scope.manageInit = function() {
      if (editing) {
        $scope.opportunity = Opportunity.get({ id: $stateParams.id }, function(opportunity) {
          // Because backend supports array of locations but UI only has single input
          if (opportunity.locations.length > 0) {
            opportunity._location = opportunity.locations[0];
          }
        });
      } else {
        // initialize opportunity to add tags before creation
        $scope.opportunity = {
          schedule: $scope.schedules[0],
          tags: []
        };
      }
    };

    $scope.previousPage = function() {
      $scope.page -= 1;
    };

    $scope.nextPage = function() {
      $scope.page += 1;
    };

    // Add a tag to the opportunity's tags
    $scope.addTag = function(opportunity, tag) {
      if (opportunity.tags.indexOf(tag) === -1) {
        opportunity.tags.push(tag);
      }
      $scope.newTag = '';
    };

    // Remove a tag by index number (0-indexed)
    $scope.deleteTag = function(opportunity, index) {
      opportunity.tags.splice(index, 1);
    };

    function prepLocation(opportunity) {
      // Because backend supports array of locations but UI only has single input
      opportunity.locations = [opportunity._location];
    }

    $scope.finish = function(opportunity) {
      prepLocation(opportunity);

      var opId;

      if (Object.keys($scope.editForm.$error).length > 0) {
        return;
      }

      var deferred = $q.defer();
      var promise = deferred.promise;

      if (!editing) {
        promise = promise.then(function(opportunity) {
          return Opportunity.create(opportunity).$promise;
        });
      }

      promise
        .then(function(opportunity) {
          return doS3Upload(opportunity);
        })
        .then(function(opportunity) {
          opId = opportunity._id;
          return Opportunity.update(opportunity).$promise;
        })
        /**
         * Redirect first to opportunities dashboard, then to opportunity detail.
         * This way if user "clicks out" of the detail, he will return to the
         * dashboard (since he is returned to the previous location). Use of
         * $timeout is necessary so the state changes occur in separate digest
         * cycles.
         */
        .then(function() {
          return $state.go('shell.opportunities');
        })
        .then(function() {
          $timeout(function() {
            $state.go('shell.opportunity.detail', { id: opId });
          });
        })
        .catch(function(err) {
          console.log('ERROR: ' + err);
        });

        deferred.resolve(opportunity);
    };

    function doS3Upload(opportunity){
      var deferred = $q.defer();

      if ($('#'+$scope.fileUploadId)[0].files.length === 0) {
        deferred.resolve(opportunity);
        return deferred.promise;
      }

      new S3Upload({
        file_dom_selector: $scope.fileUploadId,
        s3_sign_put_url: apiUrl('/opportunities/' + opportunity._id + '/s3_upload_signature'),
        onFinishS3Put: function(public_url) {
          opportunity.picture = public_url;
          deferred.resolve(opportunity);
        },
        onError: function(status) {
          deferred.reject(status);
        }
      });

      return deferred.promise;
    }

    // $scope.uploadFilesChanged = function() {
    //   if ($scope.opportunity._id) {
    //     $scope.$apply(function() {
    //       $scope.imageUploading = true;
    //       s3_upload($scope.opportunity)
    //           .finally(function() {
    //             $scope.imageUploading = false;
    //           });
    //     });
    //   }
    // };
  });
