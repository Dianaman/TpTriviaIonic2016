angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $cordovaVibration) {
  $scope.elegirCorrecto = function(){

    try{
      $cordovaVibration.vibrate(100);
    }
    catch(err){
      console.log(err.message);
    }
  }

  $scope.elegirIncorrecto = function(){
    try{
      $cordovaVibration.vibrate([100, 100, 100]);
    }
    catch(err){
      console.log(err.message);
    }
  }  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AuthorCtrl', function($scope) {

});
