
angular.module('karma.services', [])

    // Auth
    .factory('authService', function (rootRef, $firebaseAuth, $firebaseObject) {
        return {
            auth: $firebaseAuth(rootRef),
            registerUser: function (authData) {
                rootRef.child('users').child(authData.uid).child('auth').set(authData);
            }
        }

    })

    // Service for class schedules
    .factory('classService', function () {

    })