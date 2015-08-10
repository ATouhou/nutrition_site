var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData) {
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

    //defective yaa example
    //var verb = {
    //    letter1: 'ن',
    //    letter2: 'س',
    //    letter3: 'ي',
    //    type: {
    //        name: 'defective',
    //        type: 'yaa (ya-aa)'
    //    },
    //    perfectVowel: 'ِ',
    //    imperfectVowel: 'ُ'
    //}

    // hamzated example
    var verb = {
        letter1: 'ق',
        letter2: 'ر',
        letter3: 'ء',
        type: {
            name: 'hamzated'
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
