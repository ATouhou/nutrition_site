var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, filterOptions, verbs, questionsService, alertService) {
    $scope.questions = questionsService;

    $scope.alert = alertService;

    $scope.helperData = helperData;

    $scope.filterOptions = filterOptions;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

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
        $scope.questions.conjugations = $scope.questions.conjugations.concat(conjugationSet);
    })

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    $scope.questions.filteredQuestions = angular.copy($scope.questions.conjugations);

    // Set the current question
    $scope.questions.questionIndex = 0;
    $scope.questions.currentQuestion = $scope.questions.filteredQuestions[$scope.questions.questionIndex];

    $scope.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            $scope.questions.currentQuestion.isCorrect = true;
            if ($scope.questions.questionIndex >= ($scope.questions.filteredQuestions.length - 1)) {
                $scope.resetQuestions();
                $scope.alert.show('You have completed all the questions in the set!');
            }
        }
        else {
            $scope.questions.currentQuestion.isCorrect = false;
        }
    }

    $scope.resetQuestions = function() {
        $scope.alert.clear();
    }

    $scope.nextQuestion = function() {
        $scope.questions.nextQuestion();
    }

    $scope.showAnswer = function(input, answer) {
        input.answer = answer;
    }

    // Reset question set to first question
    $scope.updateQuestions = function() {
        $scope.questions.updateQuestions();
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

        var filteredQuestions = _.filter($scope.questions.conjugations, function(conjugation) {
            if (_.contains(pronounIds, conjugation.id) && _.contains(types, conjugation.verb.type.name)) {
                return true;
            }
        })

        if (filteredQuestions.length === 0) {
            $scope.alert.show('There are no questions that match your selected filters. Modify your filters to see more questions.');
        }
        else {
            $scope.alert.clear();
            $scope.questions.filteredQuestions = filteredQuestions;
            $scope.updateQuestions();
        }
    }

    //$scope.textToSpeech = function(text) {
    //    var audio = $("#my-audio");
    //    audio.attr('src', 'http://translate.google.com/translate_tts?tl=en&q=great&client=t');
    //    audio.trigger('pause');
    //    audio.trigger('load');
    //    audio.trigger('play');
    //}

})

