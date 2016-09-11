angular.module('starter.controllers', ['ngCordova', 'ionic'])

.controller('DashCtrl', function($scope) {})

.controller('TriviaCtrl', function($scope, $interval, $rootScope, $state, $ionicModal, $ionicPlatform, $cordovaVibration, $cordovaNativeAudio, $ionicModal, $timeout) {
  var mediaWin = null;
  var mediaLoose = null;
  
  $scope.misPreguntas = [];

  $scope.trivia = {};

  $scope.trivia.pregunta;
  $scope.trivia.respuestas = [];
  var pregNro = 0;

  var triviaFirebase = new Firebase('https://triviaapp-bfaf2.firebaseio.com/preguntas/');
  triviaFirebase.on('child_added', function(snapshot) {
    $timeout(function(){
      var pregunta = snapshot.val();
      $scope.misPreguntas.push(pregunta);

      $scope.trivia.pregunta = $scope.misPreguntas[pregNro].pregunta;
      $scope.trivia.respuestas = $scope.misPreguntas[pregNro].respuestas;
  
    })
  })

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


          $interval(function(){
            console.log('entra en el timeout');
            if(pregNro < $scope.trivia.respuestas.length){
              pregNro++;
              for(var i=0; i<$scope.trivia.respuestas.length; i++){
                $scope.trivia.respuestas[i].seleccionado="";
              }
            }
          }, 200);

/*          $ionicModal.fromTemplateUrl('next-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
          $scope.openModal = function() {
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            $scope.modal.hide();
          };
          // Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
          // Execute action on hide modal
          $scope.$on('modal.hidden', function() {
            // Execute action
          });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });
*/      }
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

.controller('AuthorCtrl', function($scope, $window) {
  $scope.sendMail = function(emailId, subject, message){
    $window.open("mailto:" + emailId + "?subject=" + subject+"&body="+message,"_self");
  }
});
