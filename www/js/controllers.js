angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPlatform, $cordovaVibration, $cordovaNativeAudio) {
  var mediaWin = null;
  var mediaLoose = null;
  

  try{
    $ionicPlatform.ready(function(){
      /*
      mediaWin = $cordovaMedia.newMedia("/sounds/correcto.mp3", null, null, null);
      mediaLoose = $cordovaMedia.newMedia("/sounds/incorrecto.mp3", null,null, null);

      mediaWin.then(function(){
        alert("success");
      }, function(){
        alert("error");
      });

      mediaLoose.then(function(){
        alert("success");
      }, function(){
        alert("error");
      });*/
      
      $cordovaNativeAudio
        .preloadSimple('loose', 'sounds/incorrecto.mp3');

    })

    $scope.elegirCorrecto = function(){

      try{
        //mediaWin.play();
        $cordovaVibration.vibrate(100);
      }
      catch(err){
        alert(err.message);
      }
    }

    $scope.elegirIncorrecto = function(){
      try{
        $cordovaVibration.vibrate([100, 100, 100]);
        $cordovaNativeAudio.play('loose');
        
      }
      catch(err){
        alert(err.message);
      }
    }  

  } catch(error){
    alert(error);
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
