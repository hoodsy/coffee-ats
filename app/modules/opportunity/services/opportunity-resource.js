'use strict';

angular.module('opportunity')
  .factory('Opportunity', function ($resource, apiUrl) {
    return $resource(apiUrl('/opportunities/:id'), { id: '@_id'},
      {
        'create': {method: 'POST'},
        'update': {method: 'PUT'}
    });
  });
  // .factory('chargeCustomer', function($resource){
  //   return $resource('/api/payment/:tokenID/:numItems');
  // })
  // .factory('saveCustomer', function($resource){
  //   return $resource('/api/user/payment/:tokenID/:numItems');
  // });
