var app = angular.module('applicantApp',['btford.socket-io','ngResource']);


var port = 


app.config(['$httpProvider' , function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ] );


//socket stuff provided by btford.socket-io wrapper
app.factory('socket', function(socketFactory){
	var myIoSocket = io.connect('http://localhost:3000');

	socket = socketFactory({
		ioSocket : myIoSocket
	}); 

	return socket;
})

app.factory('DataFactory', function($resource){
	return $resource("http\://localhost\:3000/user/:userId" , {userId:'1'}, {
		get: {method:'GET', isArray:false} });
}); 


app.factory('ConversationFactory', function($resource){
	return $resource('http\://localhost\:3000/user/:source/conversation/:target', {source:'' , target:''}, {
		get: { method:'GET', isArray:false }
	}); 
})



//provided uner MIT license 
app.directive('scrollGlue', function(){
        return {
            priority: 1,
            require: ['?ngModel'],
            restrict: 'A',
            link: function(scope, $el, attrs, ctrls){

                var el = $el[0],
                    ngModel = ctrls[0] ;

                function scrollToBottom(){
                    el.scrollTop = el.scrollHeight;
                }

                function shouldActivateAutoScroll(){
                    // + 1 catches off by one errors in chrome
                    return el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
                }

                scope.$watch(function(){
                    if(ngModel){
                        scrollToBottom();
                    }
                });

                $el.bind('scroll', function(){
                    var activate = shouldActivateAutoScroll();
                    if(activate !== ngModel.$viewValue){
                        scope.$apply(ngModel.$setViewValue.bind(ngModel, activate));
                    }
                });
            }
        };
    });


//provided under MIT license
app.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});


app.controller('UserController',function($scope,DataFactory){
	$scope.userIdx = 0; //idx with which to loop through users
	$scope.userList = new Array( '53b1fb9c2593bbb8348f0b89',
		'53b1fc2b2593bbb8348f0b8a',
		'53b208712593bbb8348f0b8c',
		'53b209882593bbb8348f0b8d',
		'53b20a662593bbb8348f0b91'
	); //list of all relevant users to iterate through
	$scope.user = {};  //initialize user object

	// var $jq = jQuery.noConflict();  Needed to use jquery chatbox below

	//get the user data associated with the current userIdx
	$scope.getUserData = function(){
		return DataFactory.get({userId:$scope.userList[$scope.userIdx]}).$promise.then(function(res){
			$scope.user = res; 
		})
	}

	$scope.nextApplicant = function(){
		$scope.userIdx++;
		$scope.userIdx = $scope.userIdx%$scope.userList.length; //loop through applicants
		$scope.getUserData(); 
		// console.log($scope.userIdx); 
	}

	$scope.prevApplicant = function(){ //TODO: prolly better to do this with mod
		$scope.userIdx = ($scope.userIdx < 1) ? ($scope.userList.length - 1) : ($scope.userIdx - 1);
		$scope.getUserData(); 
		// console.log($scope.userIdx); 
	}


	//intiially grab the data of the first user in the list
	$scope.getUserData(); 

})

app.controller('ChatController' , function($scope,socket,ConversationFactory){
	$scope.tempUser = '53b1fb9c2593bbb8348f0b89'; //temp to send from 
	socket.emit('join', {userId : $scope.tempUser} ) //link up to 
	$scope.conversation = []; 
	$scope.chatWindows = {}; 
	// $scope.data = {};

	//initialize text in entry field
	// $scope.data['messageInput'] = 'Enter text here';

	// $scope.addMessage = function(user) {
 //  			console.log($scope.data.messageInput)
 //  			$scope.chatWindows[ user._id ].messages.push( $scope.data.messageInput + '\n');
 //  			$scope.data.messageInput = ''; 
	// };


		//slice out the indicated chat window
	$scope.removeChatWindow = function(userId){
		delete $scope.chatWindows[userId];
	}	


	//create a message and send it to the server
	$scope.addMessage = function(chatWindow) {

		//don't add a message if the input area is blank
		if( chatWindow.messageInput === '' ){ return; }

		var message = {
  				//firstName : 'James',
  				//lastName : 'Staley',
  				created : Date.now,
  				recipient: chatWindow.userId,
  				sender : $scope.tempUser,
  				text : chatWindow.messageInput
  			}

  			socket.emit( 'send' , message );
  			chatWindow.messages.push(message);
  			chatWindow.messageInput = ''; 
  		};

		//Send Message Clicked
		$scope.messageUser = function(user){
		//get the conversation between the people TODO: what if the users haven't spoken yet? 
		ConversationFactory.get({source:$scope.tempUser , target:user._id}).$promise.then(function(res){
			$scope.conversation = res.data;

			if( $scope.chatWindows.hasOwnProperty( user._id ) ){ 
		//if the chat window assciated with the user already exists, just display it
				// $scope.chatWindows[ user._id ].show = true; //set the display value to true (assuming its not)
				$scope.chatWindows[ user._id ].messages = $scope.conversation; //set the messages to be the retrieved convo
			}
			else{ //otherwise make a new chat window

				$scope.chatWindows[ user._id ] = {
					name : '' + user.firstName + ' ' + user.lastName,
					userId : user._id,
					showEnterText : true,
					messageInput : 'Enter Text Here',
					messages: $scope.conversation //make a copy that we can append to
				}

			}

					//TODO: remove this, only for cleanliness while only 1 chat window is usable at a time
		   for( var uId in $scope.chatWindows ){

			if( uId !== user._id ){
				$scope.removeChatWindow(uId);
			}
		}

		});
	}

	//take the chat window, if its still has the 'enter text here' remove it
	$scope.removeText = function( chatWindow ){
		if( chatWindow.showEnterText ){
			chatWindow.messageInput = ''; 
			chatWindow.showEnterText = false;
		}
		return;
	}


	socket.on( 'connection' , function(socket){
		console.log('connected to server'); 
	} )
	socket.on('message', function(data){
		console.log( 'recieved : ', data)
	})
	socket.on('disconnect', function(data){
		console.log('disconnected from server')
	})
	socket.on('receive', function(data){
		console.log('Recieved the message ' , data);
		data._id = data.sender;
		$scope.messageUser( data )
	})
	socket.on('error', function(){
		console.log('error recieved')
	})

})

app.controller('ApplicantFormController' , function($scope,DataFactory){

})