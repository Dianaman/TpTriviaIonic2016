angular.module('starter.controllers', ['ngCordova', 'ionic'])

.run(function($rootScope){
  $rootScope.usuario = {};
  $rootScope.usuario.name;
  $rootScope.usuario.trivia = [];
})

.controller('LoginCtrl', function($scope, $state, $rootScope){
$scope.datos = {
  'username': ''
}

  $scope.entrar = function(){
    $rootScope.usuario.name = $scope.datos.username;
    $state.go('tab.dash');
  }
})

.controller('DashCtrl', function($scope, $rootScope) {
  $scope.datos = {};

  $scope.datos.nombre = $rootScope.usuario.name;
})

.controller('TriviaCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPlatform, $cordovaVibration, $cordovaNativeAudio, $ionicModal, $timeout) {
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

      $cordovaNativeAudio
      .preloadSimple('loose', 'sounds/incorrecto.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      $cordovaNativeAudio
      .preloadSimple('win', 'sounds/correcto.mp3')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

    })

    var correcto;
    var cantCorrectas = 0;

    $scope.elegirRespuesta = function(selected){
      try{
          if($scope.trivia.respuestas[selected].correcto == true){
            console.log('respuesta correcta');
            $scope.trivia.respuestas[selected].seleccionado="bien";

            $cordovaVibration.vibrate(100); 
            $cordovaNativeAudio.play('win');

            correcto = $scope.trivia.respuestas[selected].texto;

            cantCorrectas ++;
          }
          else {
            console.log('respuesta incorrecta');
            $scope.trivia.respuestas[selected].seleccionado="mal";
            for(var i=0; i<$scope.trivia.respuestas.length; i++){
              if($scope.trivia.respuestas[i].correcto == true){
                $scope.trivia.respuestas[i].seleccionado="bien";
                correcto = $scope.trivia.respuestas[i].texto;
              }
            }

            $cordovaVibration.vibrate([100, 100, 100]);
            $cordovaNativeAudio.play('loose');
          }

          $rootScope.usuario.trivia.push({
            pregunta: $scope.trivia.pregunta,
            correcta: correcto,
            seleccionado: $scope.trivia.respuestas[selected].texto
          });

          $timeout(function(){
            console.log('entra en el timeout');
            if(pregNro < $scope.misPreguntas.length-1){
              pregNro++;
              for(var i=0; i<$scope.trivia.respuestas.length; i++){
                $scope.trivia.respuestas[i].seleccionado="";
              }

              $scope.trivia.pregunta = $scope.misPreguntas[pregNro].pregunta;
              $scope.trivia.respuestas = $scope.misPreguntas[pregNro].respuestas;
            }
            else {
              $rootScope.usuario.puntaje = cantCorrectas + '/'+(parseInt(pregNro) +1).toString();
              $state.go('tab.final');
            }
          }, 400);

      }
      catch(err){
        alert(err.message);
      }
    }    

  } catch(error){
    alert(error);
  }


})

.controller('FinalCtrl', function($scope, $rootScope, $ionicPlatform, $cordovaFile) {
  $scope.datos = {};

  $scope.datos.nombre = $rootScope.usuario.name;
  $scope.datos.puntaje = $rootScope.usuario.puntaje;
  $scope.datos.puntuacion;

  var data = {usuario:$scope.datos.nombre, trivia:$rootScope.usuario.trivia, puntaje: $scope.datos.puntaje};

  $ionicPlatform.ready(function(){
      $cordovaFile.createFile(cordova.file.dataDirectory, "trivia.txt", true) 
      .then(function (success) {
          $cordovaFile.writeFile(cordova.file.dataDirectory, "trivia.txt", data, true)
          .then(function (success) {
            console.log("Se escribió correctamente");
            $cordovaFile.readAsText(cordova.file.dataDirectory, "trivia.txt")
              .then(function (success) {
                alert(success);
                $scope.datos.puntuacion = success;
              }, function (error) {
                alert("Error al leer");
              });
          }, function (error) {
            alert("Error al escribir");
          });
      }, function (error) {
          alert("Error al crear el archivo");
      });
  })

  $scope.enviar = function(){
    
      var triviaFirebase = new Firebase('https://triviaapp-bfaf2.firebaseio.com/puntuaciones/');
      triviaFirebase.push(data, function(error){
        if(error == null){
          alert('envio');
        }
        else{
          alert(error);
        }
      });
  }
})

.controller('RankingCtrl', function($scope, $ionicPlatform, $cordovaFile, $timeout){
    $scope.puntuaciones = [];

    var triviaFirebase = new Firebase('https://triviaapp-bfaf2.firebaseio.com/puntuaciones/');
    triviaFirebase.on('child_added', function(snapshot) {
      $timeout(function(){
        var puntuaciones = snapshot.val();
        $scope.puntuaciones.push(pregunta);
      })
    })


  $scope.archivo = {};

  try{
    $ionicPlatform.ready(function() {

      $cordovaFile.checkFile(cordova.file.dataDirectory, "trivia.txt")
        .then(function (success) {
            $cordovaFile.readAsText(cordova.file.dataDirectory, "trivia.txt")
            .then(function (success) {
              $scope.archivo.puntaje = success;
            }, function (error) {
              $scope.archivo.error = "Error al leer";
            });
        }, function (error) {
          $scope.archivo.error = 'No hay ningun juego guardado';
        });


    });
  }
  catch(ex){
    $scope.archivo.error = ex.message;
  }
})

.controller('AuthorCtrl', function($scope, $window) {
  $scope.sendMail = function(emailId, subject, message){
    $window.open("mailto:" + emailId + "?subject=" + subject+"&body="+message,"_self");
  }
});
