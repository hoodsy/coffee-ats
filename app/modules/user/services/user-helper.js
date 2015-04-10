'use strict';

angular.module('user')
  .factory('userHelper', function (USER_CONFIG) {
    return {

      /**
       * Check if user needs to be sent to setup pages
       *  @param user (obj) user to check
       *  @returns user (obj) user passed in with _isSetup flag added, when
       *  _isSetup is true, user is already setup
       */
      checkNeedsSetup: function(user) {
        var attrs = ['firstName', 'lastName', 'headline', 'position', 'organization'];

        user._isSetup = true;

        for (var i = 0; i < attrs.length; i++) {
          if (user[attrs[i]] === undefined) {
            user._isSetup = false;
            return user;
          }
        }

        if (user.experiences.length === 0 ||
            user.educations.length === 0 ||
            user.tags.length < USER_CONFIG.numRequiredTags) {
          user._isSetup = false;
          return user;
      }

      return user;
    }
  };
});
