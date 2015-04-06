'use strict';

angular.module('shell')
  .controller('LoginCtrl', function ($scope, $window, apiUrl) {
    $scope.carouselIndex = 0;

    $scope.slides = [{
      image: 'icon-login-discover',
      header: 'Discover',
      body: 'professional opportunities by scrolling through a curated feed'
    }, {
      image: 'icon-login-swipe',
      header: 'Match',
      body: 'with people and opportunities you are interested in by swiping or doubletapping'
    }, {
      image: 'icon-login-chat',
      header: 'Chat',
      body: 'with your matches to set up coffee meetings and potential interviews'
    }, {
      image: 'icon-login-opportunities',
      header: 'Opportunities',
      body: 'Post interesting jobs, internships, and freelance gigs to promote your company or organization'
    }];

    $scope.loginLinkedin = function() {
      $window.location.href = apiUrl('/auth/linkedin');
    };
  });
