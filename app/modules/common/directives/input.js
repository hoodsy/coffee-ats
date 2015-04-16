'use strict';

angular.module('common')
  .directive('coffeeInput', function($compile, $interpolate) {

    function createEl(inputName, errorType, errorMsg) {
      return ('<span class="coffee-input-helper" data-ng-if="editForm.' +
        inputName + '.$error.' +  errorType + '">' + errorMsg + '</span>');
    }

    var errorTypes = [
      { type: 'required', msg: 'Required' },
      { type: 'maxlength', msg: 'Too Long' },
      { type: 'number', msg: 'Not a number' },
      { type: 'max', msg: 'Too high' },
      { type: 'min', msg: 'Too low' },
      { type: 'coffeemin', msg: 'Need more' }
    ];

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var name = attrs.name;
        if (name) {
          errorTypes.forEach(function(type) {
            if (attrs[type.type] !== undefined ||
                attrs.type === type.type) {
              var msg = attrs[type.type + 'Msg'] || type.msg;
              var el = $interpolate(createEl(name, type.type, msg))(scope);
              ($compile(el)(scope)).insertAfter(element);
            }
          });
        }
      }
    };
});
