var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData) {
    // sound example
    //var verb = {
    //    letter1: 'ك',
    //    letter2: 'ت',
    //    letter3: 'ب',
    //    type: {
    //        name: 'sound'
    //    },
    //    perfectVowel: 'َ',
    //    imperfectVowel: 'ُ'
    //}

    // hollow waaw example
    var verb = {
        letter1: 'ق',
        letter2: 'و',
        letter3: 'ل',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ'
    }

    // geminate example
    var verb = {
        letter1: 'د',
        letter2: 'ل',
        letter3: 'ل',
        type: {
            name: 'geminate'
        },
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

    $scope.helperData = helperData;

    // selections made by the user
    $scope.userInput = {};

    $scope.generateVerbs = function(userInput) {
        if (userInput.letter1 && userInput.letter2 && userInput.letter3 && userInput.perfectVowel && userInput.type) {
            $scope.conjugator.setVerb(userInput);
        }
    }
})
