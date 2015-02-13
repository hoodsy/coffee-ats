'use strict';

angular.module('opportunity')
  .directive('opportunityPostCard', function() {

    var count = 0;

    return {
      restrict: 'A',
      scope: {
        model: '=',
        showControlsId: '=',
        onDelete: '&'
      },
      templateUrl: 'modules/opportunity/partials/opportunity-post-card.html',
      controller: 'OpportunityPostCardCtrl',
      link: function(scope) {
        count = (count + 1) % 3;
        scope.count = count;
      }
    };
});
