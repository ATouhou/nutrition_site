var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, hamzatedWord, helperData, menuOptions) {

    $scope.helperData = helperData;

    $scope.menuOptions = menuOptions;



})

