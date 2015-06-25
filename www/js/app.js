// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova'])

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
$ionicConfigProvider.tabs.position('bottom');    

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
    url:'/now-playing',
    views:{
        nowplaying:{
            templateUrl:'now-playing.html'
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
    handleExternalURLs();
    //URL handlers

      function handleExternalURLs() {
    // Handle click events for all external URLs
    if (device.platform.toUpperCase() === 'ANDROID') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            navigator.app.loadUrl(url, { openExternal: true });
            e.preventDefault();
        });
    }
    else if (device.platform.toUpperCase() === 'IOS') {
        $(document).on('click', 'a[href^="http"]', function (e) {
            var url = $(this).attr('href');
            window.open(url, '_system');
            e.preventDefault();
        });
    }
    else {
        // Leave standard behaviour
    }
}
  });
})

.controller('ListaCtrl',function($scope,$http){
	$http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLvM3GnVT0LjZkRgW7jHIxZpSppuwzmUZy&maxResults=40&key=AIzaSyDhDZjburmzpaoH39Uj4dnU6X_GRLbCVW0').then(function(resp) {
    console.log('Success', resp);
	$scope.items = resp.data.items;
        
    $scope.playvideo = function(id,title){
        document.getElementById("video-player").innerHTML = '<iframe src="http://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen class="yt-playeri"></iframe>';
        document.getElementById("now-playing").innerHTML = title;
        
        $scope.shareAnywhere = function() {
            console.log("Shared: ID: " + id + " title: " + title);
            $cordovaSocialSharing.shareViaFacebook('Duke shikuar: ' , title, null, 'http://www.youtube.com/watch?v=' + id);
        }
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
