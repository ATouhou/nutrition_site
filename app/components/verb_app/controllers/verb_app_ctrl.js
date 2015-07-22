var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, pronounList) {
    var verb = {
        letter1: 'ك',
        letter2: 'ت',
        letter3: 'ب',
        type: 'sound',
        perfectVowel: 'َ',
        imperfectVowel: 'ُ'
    }

    var options = {
        form: 1,
        person: 'thirdPerson',
        gender: 'feminine',
        number: 'plural',
        tense: 'perfect'
    }


    $scope.conjugator = conjugator;
    $scope.conjugator.initialize(verb, options);

    $scope.pronounList = pronounList;
})
