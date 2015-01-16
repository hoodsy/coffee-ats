'use strict';

var currencySymbols = {
    'USD': '$', // US Dollar
    'EUR': '€' // Euro
};

angular.module('opportunity')
  .filter('salary', function() {
    return function(salaryMin, salaryMax, salaryCurrency) {

      salaryCurrency = salaryCurrency || 'USD';

      var suffix = '';

      if (salaryMin > 1000 && salaryMax > 1000) {
        salaryMin /= 1000;
        salaryMax /= 1000;
        suffix = 'K';
      }

      var formattedSalary = [
        currencySymbols[salaryCurrency],
        +salaryMin,
        '-',
        +salaryMax,
        suffix
      ];

      return formattedSalary.join('');
    };
});
