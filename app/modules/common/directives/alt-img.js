'use strict';

angular.module('common')
  .directive('altImg', function($timeout) {

    // Max time to wait for img source to resolve
    var MAX_WAIT = 1000;

    return {
      restrict: 'A',
      scope: {
        altImg: '@'
      },
      link: function(scope, element, attrs) {

        // If the image fails to load, put up a question icon
        element.bind('error', function() {
          $(this).hide().after(ques);
        });

        if (scope.altImg) {
          element.show();
          element.attr('src', scope.altImg);
          return;
        }

        var spin = $('<span class="fa-stack fa-lg alt-img">' +
            '<i class="fa fa-circle fa-stack-2x fa-inverse"></i>' +
            '<i class="fa fa-spinner fa-spin fa-stack-1x"></i>' +
          '</span>');
        var ques = $('<span class="fa-stack fa-lg alt-img">' +
            '<i class="fa fa-circle fa-stack-2x fa-inverse"></i>' +
            '<i class="fa fa-question fa-stack-1x"></i>' +
          '</span>');

        function setCss(el) {
          el.css('top', element.css('top'));
        }

        setCss(spin);
        setCss(ques);

        // On init, put spinner in place
        element.hide();
        element.after(spin);

        // Watch for source url to change
        var done = scope.$watch('altImg', function(newVal, oldVal) {
          if (!newVal && newVal === oldVal) {
            return;
          }
          if (newVal) {
            // When url is not empty, detach spinner and set src attr
            spin.detach();
            element.show();
            element.attr('src', newVal);
          }

          // Stop watching
          done();
        });

        // After MAX_WAIT we stop the spinner and put up a question icon
        $timeout(function() {
          if (!scope.altImg) {
            element.after(ques);
            spin.detach();
          }
        }, MAX_WAIT);
      }
    };
});
