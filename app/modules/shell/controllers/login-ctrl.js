'use strict';

angular.module('shell')
  .controller('LoginCtrl', function ($scope, $window) {
    $scope.carouselIndex = 0;

    $scope.slides = [{
      header: 'Hello',
      subheader: 'Welcome to Coffee',
      body: 'advance your career'
    }, {
      header: 'Discover',
      body: 'professional opportunities by scrolling through a curated feed'
    }, {
      header: 'Match',
      body: 'with people and opportunities you are interested in by swiping or doubletapping'
    }, {
      header: 'Chat',
      body: 'with your matches to set up coffee meetings and potential interviews'
    }, {
      header: 'Opportunities',
      body: 'Post interesting jobs, internships, and freelance gigs to promote your company or organization'
    }];

    $scope.loginLinkedin = function() {
      $window.location.href = '/api/auth/linkedin';
    };
  });
