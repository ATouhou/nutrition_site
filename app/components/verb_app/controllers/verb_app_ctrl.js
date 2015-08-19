var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, menuOptions, verbs) {
    $scope.input = {};

    $scope.helperData = helperData;

    $scope.pronounList = helperData.pronounList;

    $scope.menuOptions = menuOptions;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    $scope.conjugations = [];

    _.forEach($scope.pronounList, function(pronoun) {
        pronoun.selected = true;
    })

    _.forEach($scope.verbs, function(verb) {
        var conjugationSet = conjugator.getConjugations(verb);
        // Add the verb object to it's conjugation set
        _.forEach(conjugationSet, function(cSet) {
            cSet.verb = verb;
        })
        $scope.conjugations = $scope.conjugations.concat(conjugationSet);
    })

    // Add pronoun so as to keep track of which conjugations are selected
    _.forEach($scope.conjugations, function(conjugation, index) {
        //conjugation.verb = _.findWhere($scope.verbs, {})
        conjugation.menuItem = _.findWhere($scope.pronounList, {id: conjugation.id});
    })

    // This is the function that basically filters the question set
    $scope.selectedQuestions = function() {
        return _.filter($scope.conjugations, function(item) {
            return item.menuItem.selected === true;
        })
    }

    // Set the current question
    var currentIndex = 0;
    $scope.currentConjugation = $scope.selectedQuestions()[currentIndex];

    $scope.submit = function(userAnswer, answer) {
        if (userAnswer === answer) {
            alert('correct');
            $scope.next();
        }
        else {
            alert('wrong answer');
        }
    }

    $scope.next = function() {
        currentIndex += 1;
        $scope.currentConjugation = $scope.selectedQuestions()[currentIndex];
        $scope.input = {};
    }

    $scope.showAnswer = function(input, answer) {
        input.answer = answer;
    }

    // After any change to the filters
    $scope.updateQuestions = function() {
        currentIndex = 0;
        $scope.currentConjugation = $scope.selectedQuestions()[currentIndex];
    }

})

