'use strict';

angular.module('opportunity', [
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'smart-table',
  'stripe',
  'xeditable'
])
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
