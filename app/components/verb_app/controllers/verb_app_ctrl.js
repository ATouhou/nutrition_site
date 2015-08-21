var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, filterOptions, verbs) {
    $scope.input = {};

    $scope.helperData = helperData;

    $scope.filterOptions = filterOptions;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;
    $scope.conjugations = [];

    _.forEach($scope.filterOptions.pronouns, function(pronoun) {
        pronoun.selected = true;
    })

    _.forEach($scope.filterOptions.types, function(type) {
        type.selected = true;
    })

    _.forEach($scope.verbs, function(verb) {
        var conjugationSet = conjugator.getConjugations(verb);
        // Add the verb object to it's conjugation set
        _.forEach(conjugationSet, function(cSet) {
            cSet.verb = verb;
        })
        $scope.conjugations = $scope.conjugations.concat(conjugationSet);
    })

    // Create a shallow copy so that changes to filteredConjugations do not affect the original conjugation list
    // filteredConjugations will be the deck used to display the questions
    $scope.filteredConjugations = angular.copy($scope.conjugations);


    // Set the current question
    var currentIndex = 0;
    $scope.currentConjugation = $scope.filteredConjugations[currentIndex];

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
        $scope.currentConjugation = $scope.filteredConjugations[currentIndex];
        $scope.input = {};
    }

    $scope.showAnswer = function(input, answer) {
        input.answer = answer;
    }

    // Reset question set to first question
    $scope.updateQuestions = function() {
        currentIndex = 0;
        $scope.currentConjugation = $scope.filteredConjugations[currentIndex];
    }

    // This is run if there is any change to any of the filters
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            filterQuestions();
        }
    }, true)

    // This is the function that basically filters the question set
    function filterQuestions() {
        var pronounIds = _.pluck(_.filter($scope.filterOptions.pronouns, {selected: true}), 'id');
        var types = _.pluck(_.filter($scope.filterOptions.types, {selected: true}), 'name');

        var filteredQuestions = _.filter($scope.conjugations, function(conjugation) {
            if (_.contains(pronounIds, conjugation.id) && _.contains(types, conjugation.verb.type.name)) {
                return true;
            }
        })

        $scope.filteredConjugations = filteredQuestions;
        $scope.updateQuestions();
    }

})

