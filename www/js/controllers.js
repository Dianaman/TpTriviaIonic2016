angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('TriviaCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPlatform, $cordovaVibration, $cordovaNativeAudio) {
  var mediaWin = null;
  var mediaLoose = null;
  
  $scope.trivia = {};

  $scope.trivia.pregunta = '¿De qué color es el caballo blanco de San Martin?'
  $scope.trivia.respuestas = [];

  $scope.trivia.respuestas[0] = {};
  $scope.trivia.respuestas[1] = {};
  $scope.trivia.respuestas[2] = {};
  $scope.trivia.respuestas[3] = {};

  $scope.trivia.respuestas[0].texto = 'Negro';
  $scope.trivia.respuestas[1].texto = 'Moteado';
  $scope.trivia.respuestas[2].texto = 'Blanco';
  $scope.trivia.respuestas[3].texto = 'Marron'; 

  $scope.trivia.respuestas[0].correcto = false;
  $scope.trivia.respuestas[1].correcto = false;
  $scope.trivia.respuestas[2].correcto = true;
  $scope.trivia.respuestas[3].correcto = false; 
  
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
      /*
      $cordovaNativeAudio
        .preloadSimple('loose', 'sounds/incorrecto.mp3');

*/
    })
    $scope.elegirRespuesta = function(selected){
      try{
          if($scope.trivia.respuestas[selected].correcto == true){
            console.log('respuesta correcta');
            $scope.trivia.respuestas[selected].seleccionado="bien";

            $cordovaVibration.vibrate(100); 
          }
          else {
            console.log('respuesta incorrecta');
            $scope.trivia.respuestas[selected].seleccionado="mal";
            for(var i=0; i<$scope.trivia.respuestas.length; i++){
              if($scope.trivia.respuestas[i].correcto == true){
                $scope.trivia.respuestas[i].seleccionado="bien";
              }
            }

            $cordovaVibration.vibrate([100, 100, 100]);
            //$cordovaNativeAudio.play('loose');
          }
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
