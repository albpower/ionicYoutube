// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova']);

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
$ionicConfigProvider.tabs.position('bottom');
$ionicConfigProvider.views.maxCache(0);

$stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('playlist', {
  url: '/playlist',
  views: {
    playlist: {
      templateUrl: 'playlist.html'
    }
  }
})


$stateProvider.state('now-playing',{
    url:'/now-playing/:id/:title',
    views:{
        nowplaying:{
            templateUrl: 'now-playing.html',
            controller: 'nowPlayingCtrl'
        }
    }
})

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
  });
})

.controller('ListaCtrl',function($scope,$http,$state){
	$http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLvM3GnVT0LjZkRgW7jHIxZpSppuwzmUZy&maxResults=40&key=AIzaSyDhDZjburmzpaoH39Uj4dnU6X_GRLbCVW0').then(function(resp) {
    console.log('Success', resp);
 	$scope.items = resp.data.items;
           
    $scope.playvideo = function(id,title){
        $state.go('now-playing',{id:id,title:title});
       //SocialShare function
        
    }
   // console.log("VideoID: " + id);
    
        // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
        //PLueTNPnrNvSHjlZcJb4-Yt6LXUwa53M_p - Sami Yusuf
        //PL97C2D4AAC980FDD7 Ilahi
  })
})

.controller('nowPlayingCtrl',function ($scope, $http, $stateParams){
    $scope.videoId = $stateParams.id;
    $scope.videoTitle = $stateParams.title;
    console.log('videoID: '+ $scope.videoId);
    
    document.getElementById("video-player").innerHTML = '<iframe src="http://www.youtube.com/embed/' + $scope.videoId + '" frameborder="0" allowfullscreen class="yt-playeri"></iframe>';
    document.getElementById("now-playing").innerHTML = $scope.videoTitle;
    
    $scope.shareAnywhere = function() {
    console.log("Shared: ID: " + $scope.videoId + " title: " + $scope.videoTitle);
    window.plugins.socialsharing.shareViaFacebook('Duke shikuar: ' + $scope.videoTitle + 'http://www.youtube.com/watch?v=' + $scope.videoId, null /* img */, null /* url */);
    //$cordovaSocialSharing.shareViaFacebook('Duke shikuar: ' , title, null, 'http://www.youtube.com/watch?v=' + id);
   }
})
