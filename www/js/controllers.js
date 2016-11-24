angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http, $cookies, $ionicLoading) {
  /*$scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];*/

  $scope.playlists = [];
  //$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  //$http.defaults.headers.get['X-CSRFToken'] = $cookies.csrftoken;
  $ionicLoading.show({
      template: 'Descargando...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });


  $http.defaults.headers.put['X-CSRFToken'] = $cookies.get('csrftoken');
  $http.get("https://tomathonweb.appspot.com/api/rank/").then(function(resp){
    console.log('Success', resp.data.results); // JSON object
    $scope.playlists = resp.data.results;
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });

  },function(err){
    console.error('ERR', err);
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
    alert("No se pudo acceder a la data, por favor verifique su conexion a internet.");
  })

  $scope.doRefresh = function() {
    $ionicLoading.show({
      template: 'Descargando...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
    $http.get("https://tomathonweb.appspot.com/api/rank/").then(function(resp){
    console.log('Success', resp.data.results); // JSON object
    $scope.playlists = resp.data.results;
    $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });

    },function(err){
      console.error('ERR', err);
      alert("No se pudo acceder a la data, por favor verifique su conexion a internet.");
      $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
      });
    })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');

     });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('createRankCtrl', function($scope, $http, $stateParams, $ionicLoading) {

  $scope.rank = {}

  // Called when the form is submitted
  $scope.createRank = function() {

    $ionicLoading.show({
      template: 'Guardando información...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });

    var parameter = JSON.stringify({
            "username": $scope.rank.username,
            "facebook_id": $scope.rank.facebook_id,
            "email": $scope.rank.email,
            "first_name": $scope.rank.first_name,
            "last_name": $scope.rank.last_name,
            "points": $scope.rank.points,
            "highest_score": $scope.rank.highest_score
        });
    $http.post("https://tomathonweb.appspot.com/api/rank/", parameter).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        alert("Se han guardado los datos correctamente");
        $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
        });

      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
        alert("Hubo un error guardando los datos");
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });
        });

  };

});
