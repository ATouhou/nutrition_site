var site = angular.module('arabicSite', ['firebase']);

site.controller('rootCtrl', function($scope, $firebaseObject, $firebaseArray) {
    $scope.name = 'Shazeb Qadir';
})
