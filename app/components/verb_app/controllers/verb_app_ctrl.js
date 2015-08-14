var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, menuOptions, verbs) {

    $scope.helperData = helperData;

    $scope.menuOptions = menuOptions;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;


})

