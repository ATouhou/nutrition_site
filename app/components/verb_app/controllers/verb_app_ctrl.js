var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, menuOptions, verbs) {

    $scope.helperData = helperData;

    $scope.pronounList = helperData.pronounList;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    _.forEach($scope.verbs, function(verb) {
        verb.conjugations = conjugator.getConjugations(verb);
        _.forEach(verb.conjugations, function(conjugation, index) {
            conjugation.menuItem = $scope.pronounList[index];
        })
    })

    $scope.isSelected = function(conjugation) {
        if (conjugation.menuItem.selected === true) {
            return true;
        }
        else {
            return false;
        }
    }
})

