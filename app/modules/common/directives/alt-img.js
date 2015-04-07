'use strict';

angular.module('common')
  .directive('altImg', function($timeout) {

    // Max time to wait for img source to resolve
    var MAX_WAIT = 1000;

    return {
      restrict: 'A',
      scope: {
        altImg: '@',
        failImg: '@'
      },
      link: function(scope, element) {

        // Flag when attempting to fallback to failImg incase it also fails
        var failedOnce = false;

        var spin = $('<span class="fa-stack fa-lg alt-img">' +
            '<i class="fa fa-circle fa-stack-2x fa-inverse"></i>' +
            '<i class="fa fa-spinner fa-spin fa-stack-1x"></i>' +
          '</span>');
        var ques = $('<span class="fa-stack fa-lg alt-img">' +
            '<i class="fa fa-circle fa-stack-2x fa-inverse"></i>' +
            '<i class="fa fa-question fa-stack-1x"></i>' +
          '</span>');

        function fallback(element) {
          if (scope.failImg && !failedOnce) {
            failedOnce = true;
            element.show().attr('src', scope.failImg);
          } else {
            element.hide().after(ques);
          }
        }

        // If the image fails to load, put up a question icon
        element.bind('error', function() {
          fallback($(this));
        });

        // Tweak spinner / question css so it matches <img> CSS
        function setCss(el) {
          ['top', 'left', 'right', 'bottom'].forEach(function(loc) {
            el.css(loc, element.css(loc));
          });
        }

        setCss(spin);
        setCss(ques);

        // Image source already resolved, no need to setup spinner
        if (scope.altImg) {
          element.show();
          element.attr('src', scope.altImg);
          return;
        }

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
            element.show().attr('src', newVal);
          }

          // Stop watching
          done();
        });

        // After MAX_WAIT we stop the spinner and put up a question icon
        $timeout(function() {
          if (!scope.altImg) {
            fallback(element);
            spin.detach();
          }
        }, MAX_WAIT);
      }
    };
});
