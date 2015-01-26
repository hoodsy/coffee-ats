'use strict';

angular.module('opportunity')
  .factory('Opportunity', function ($resource) {
    return $resource('/api/opportunities/:id', { id: '@_id'},
      {'save': {method: 'POST', isArray: true}} );
  })
  .factory('chargeCustomer', function($resource){
    return $resource('/api/payment/:tokenID/:numItems');
  })
  .factory('saveCustomer', function($resource){
    return $resource('/api/user/payment/:tokenID/:numItems');
  });
