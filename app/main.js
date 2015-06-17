var site = angular.module('arabicSite', ['firebase']);

site.controller('rootCtrl', function($scope, $firebaseObject, $firebaseArray) {

    $scope.name = 'Shazeb Qadir';

    var ref = new Firebase("https://sizzling-inferno-9713.firebaseio.com/data");

    // download the data into a local object
    var syncObject = $firebaseObject(ref);

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "data")

    $scope.messages = $firebaseArray(ref);

    $scope.addMessage = function() {
        $scope.messages.$add({
            text: $scope.newMessageText
        });
    }
})



