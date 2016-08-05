var app = angular.module('karma.controllers', []);

var fireRef = new Firebase("https://cbapp.firebaseio.com");

// Main app & menu controller
app.controller('menuCtrl', function ($scope, $ionicHistory, $localStorage, $ionicModal, authService) {

    $scope.$storage = $localStorage.$default({
        user: {}
    });

    $scope.views = [
        { name: "profile", ref: "profile/" + $scope.$storage.user.uid, icon: "ion-android-person" },
        { name: "classes", ref: "classes", icon: "ion-university" },
        { name: "cougarvision", ref: "cougarvision", icon: "ion-ios-videocam" },
        { name: "calendar", ref: "calendar", icon: "ion-android-calendar" },
    ];

    $scope.$watch('$storage.user.uid', function () {
        $scope.views[0] = { name: "profile", ref: "profile/" + $scope.$storage.user.uid, icon: "ion-android-person" };
    });

    $scope.auth = authService.auth;
    $scope.auth.$onAuth(function (authData) {
        if (authData) {
            authService.registerUser(authData);
            $scope.$storage.user = {
                profileImageURL: authData[authData.provider].profileImageURL,
                displayName: authData[authData.provider].displayName,
                uid: authData.uid
            }
            $scope.authModal.hide();
        } else {
            $scope.$storage.user = {
                profileImageURL: "../img/user-default.jpg",
                displayName: "Anonymous User",
                uid: null
            }
            $scope.authModal.show();
        }
    });

    // Highlight current view in menu
    $scope.isViewSelected = function (name) {
        if ($ionicHistory.currentStateName() == 'app.' + name) {
            return true
        } else {
            return false
        }
    };

    // Settings modal open
    $ionicModal.fromTemplateUrl('settingsModal.html', function (modal) {
        $scope.settingsModal = modal;
    }, {
            scope: $scope,
            animation: 'slide-in-right',
            focusFirstInput: true
        });

    // Auth modal open
    $ionicModal.fromTemplateUrl('authModal.html', function (modal) {
        $scope.authModal = modal;
    }, {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        });

});

// Settings modal
app.controller('settingsModalCtrl', function ($scope, authService) {

    $scope.hideModal = function () {
        $scope.settingsModal.hide();
    };

    $scope.logout = function () {
        authService.auth.$unauth();
        $scope.hideModal();
    };
});

// Auth modal
app.controller('authModalCtrl', function ($scope, authService, $localStorage) {

    $scope.auth = function (method) {
        authService.auth.$unauth();
        authService.auth.$authWithOAuthPopup(method);
    }

});

// Cougarvision view
app.controller('cvCtrl', function ($scope) {

});

// News & announcements view
app.controller('profileCtrl', function ($scope, $colorThief, $stateParams, $firebaseObject, rootRef) {
    $scope.profile = {}
    $scope.$on('$ionicView.beforeEnter', function () {
        var obj = $firebaseObject(rootRef.child('users').child($stateParams.uid));
        obj.$loaded(function (data) {
            $scope.setColor(data.auth[data.auth.provider].profileImageURL);
            $scope.profile = data;
        });
    });

    $scope.setColor = function (src) {
        var image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = src;
        image.onload = function () {
            $scope.dominantColor = $colorThief.getColor(image);
            console.log("OK")
        };
    }
});

// News & announcements view
app.controller('classCtrl', function ($scope, $cordovaGeolocation) {
    var posOptions = { timeout: 10000, enableHighAccuracy: true };
    $scope.location = {}
    document.addEventListener("deviceready", function () {
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.location.lat = position.coords.latitude
                $scope.location.long = position.coords.longitude
            }, function (err) {
                // error
            });
    }, false);

});

// News & announcements view
app.controller('calendarCtrl', function ($scope) {
});