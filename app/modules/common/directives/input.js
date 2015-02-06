'use strict';

angular.module('common')
  .directive('coffeeInput', function($compile, $interpolate) {

    function createEl(inputName, errorType, errorMsg) {
      return ('<span class="coffee-input-helper" data-ng-if="editForm.' +
        inputName + '.$error.' +  errorType + '">' + errorMsg + '</span>');
    }

    var errorTypes = [
      { type: 'required', msg: 'Required' },
      { type: 'maxlength', msg: 'Too Long' }
    ];

    return {
      restrict: 'A',
      link: function(scope, element) {
        var name = element.attr('name');
        if (name) {
          errorTypes.forEach(function(type) {
            if (element.attr(type.type) !== undefined) {
              var el = $interpolate(createEl(name, type.type, type.msg))(scope);
              ($compile(el)(scope)).insertAfter(element);
            }
          });
        }
      }
    };
});
