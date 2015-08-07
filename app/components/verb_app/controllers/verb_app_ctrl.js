var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData) {
    //defective waaw example
    var verb = {
        letter1: 'م',
        letter2: 'ش',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
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
