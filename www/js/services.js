
angular.module('karma.services', [])

    // Auth
    .factory('authService', function (rootRef, $firebaseAuth, $firebaseObject) {
        return {
            auth: $firebaseAuth(rootRef),
            registerUser: function (authData) {
                console.log(authData)
                rootRef.child('users').child(authData.uid).child('auth').set(
                    {
                        provider: authData.provider,
                        displayName: authData[authData.provider].displayName,
                        profileImageURL: authData[authData.provider].profileImageURL,
                        uid: authData.uid
                    }
                );
            }
        }

    })

    // Service for class schedules
    .factory('classService', function () {

    })