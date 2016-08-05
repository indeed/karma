// Ionic karma App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'karma' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'karma.controllers' is found in controllers.js
var app = angular.module('karma', ['ionic',
    'firebase',
    'ngCordova',
    'ngAnimate',
    'ngStorage',
    'ngColorThief',
    'ionicRipple',
    'karma.controllers',
    'karma.services',
    'karma.utils',
])
    .constant('FirebaseUrl', 'https://rsykarma.firebaseio.com/')
    .service('rootRef', ['FirebaseUrl', Firebase]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        /*if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }*/
        if (StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.backgroundColorByHexString("#FF8F00");
        }
    })


});

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider, $colorThiefProvider) {

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('left');
    $ionicConfigProvider.tabs.position('top');
    
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/menu.html',
            controller: 'menuCtrl'
        })

        .state('app.calendar', {
            url: '/calendar',
            views: {
                'menuContent': {
                    templateUrl: 'views/calendar.html',
                    controller: 'calendarCtrl'
                }
            }
        })

        .state('app.classes', {
            url: '/classes',
            views: {
                'menuContent': {
                    templateUrl: 'views/classes.html',
                    controller: 'classCtrl'
                }
            }
        })

        .state('app.profile', {
            url: '/profile/{uid}',
            views: {
                'menuContent': {
                    templateUrl: 'views/profile.html',
                    controller: 'profileCtrl'
                }
            }
        })

        .state('app.cougarvision', {
            url: '/cougarvision',
            views: {
                'menuContent': {
                    templateUrl: 'views/cougarvision.html',
                    controller: 'cvCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/calendar');
});
