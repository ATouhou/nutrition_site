var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator) {
    var verb = {
        letter1: 'د',
        letter2: 'ر',
        letter3: 'س',
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
})
