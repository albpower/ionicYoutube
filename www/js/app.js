// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
  url: '/home',
  views: {
    home: {
      templateUrl: 'home.html'
    }
  }
})

$stateProvider.state('help', {
  url: '/help',
  views: {
    help: {
      templateUrl: 'help.html'
    }
  }
})

$stateProvider.state('featured',{
	url:'/featured',
	views:{
		featured:{
			templateUrl: 'featured.html'
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

.controller('ListaCtrl',function($scope,$http){
	$http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLueTNPnrNvSHjlZcJb4-Yt6LXUwa53M_p&key=AIzaSyDhDZjburmzpaoH39Uj4dnU6X_GRLbCVW0').then(function(resp) {
    console.log('Success', resp);
	$scope.items = resp.data.items;
    $scope.playvideo = function(id){
        document.getElementById("video-player").innerHTML = '<iframe src="http://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen class="yt-playeri"></iframe>';
        console.log("VideoID: " + id);
       
    }
            
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})
