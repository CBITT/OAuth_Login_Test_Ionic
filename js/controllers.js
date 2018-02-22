angular.module('starter.controllers', ['ionic','ngCordova','ngCordovaOauth'])

.controller('MapController', function($scope, $ionicLoading) {

    google.maps.event.addDomListener(window, 'load', function() {
        var myLatlng = new google.maps.LatLng(53.342280, -6.264251);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;
    });

})


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



.controller('LoginwithGoogle',function($scope,$state, $cordovaOauth){
  $scope.LoginwithGoogle = function(){
    console.log("clicked");
    $cordovaOauth.google("832240901133-iug9rkqgjh9ficqnm1qsvhhm3ioqcb04.apps.googleusercontent.com",
                          ["email"]).then(function($state) {
$state.preventDefault();
 $state.go('index');
alert("hello..!!");

        }, function(error) {
            alert("Auth Failed..!!"+error);
        });
  };
})
.controller('LoginwithFacebook',function($scope,$cordovaOauth){
 $scope.LoginwithFacebook = function(){
 console.log("clicked");
 $cordovaOauth.facebook("569671236564581", ["email"]).then(function(result) {
 alert("Auth Success..!!"+result);
 }, function(error) {
 alert("Auth Failed..!!"+error);
 });
 };
 });
