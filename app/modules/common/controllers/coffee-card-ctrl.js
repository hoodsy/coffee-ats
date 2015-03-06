'use strict';

angular.module('common')
  .controller('CoffeeCardCtrl', function ($scope, $timeout, UserLike, Feed) {

    var CARD_STATES = {
      LIKED: 'liked',
      ASK_DELETE: 'askDelete',
      HIDDEN: 'hidden'
    };

    var CARD_CSS_CLASSES = {
      LIKED: 'like-slide',
      ASK_DELETE: 'ask-delete-slide'
    };

    // Reference to a special css class for state transitions
    $scope.item._cssClass = null;

    // Hold the current state of the card
    $scope.item._state = null;


    // User initiates like of a feed item
    $scope.like = function($event, model) {
      $event.stopPropagation();

      // Bail if card is in another state
      if (model._state !== null) {
        return;
      }

      model._cssClass = CARD_CSS_CLASSES.LIKED;

      UserLike.save([{ type: model.type, _id: model._id }], function() {

        console.log('success');
      }, function(err) {

        model._state = CARD_STATES.LIKED;
        $timeout(function() {
          model._state = CARD_STATES.HIDDEN;
        }, 2000);

        console.log('err');
      });
    };


    // User initiates deletion of a feed item, prompt for Deletion
    $scope.askDelete = function($event, model) {
      $event.stopPropagation();

      // Bail if card is in another state
      if (model._state !== null) {
        return;
      }

      model._cssClass = CARD_CSS_CLASSES.ASK_DELETE;
      model._state = CARD_STATES.ASK_DELETE;
    };

    // User cancels deletion
    $scope.cancelDelete = function($event, model) {
      $event.stopPropagation();
      model._cssClass = null;
      model._state = null;
    };

    // User affirms deletion, send DELETE request to server
    $scope.delete = function($event, model) {
      $event.stopPropagation();

      var params = {};
      params[model.type + 'Ids'] = [model._id];

      Feed.delete(params, function() {

        console.log('success');
      }, function(err) {

        model._state = CARD_STATES.HIDDEN;
        console.log('err');
      });
    };

  });
