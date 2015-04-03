'use strict';

angular.module('opportunity')
  .factory('Opportunity', function ($resource, API_ROOT_URL) {
    return $resource(API_ROOT_URL + '/opportunities/:id', { id: '@_id'},
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
