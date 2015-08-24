var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, filterOptions, verbs, questionData, $http) {
    $scope.data = questionData;

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
        $scope.data.conjugations = $scope.data.conjugations.concat(conjugationSet);
    })

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    $scope.data.filteredQuestions = angular.copy($scope.data.conjugations);

    // Set the current question
    var currentIndex = 0;
    $scope.data.currentQuestion = $scope.data.filteredQuestions[currentIndex];

    $scope.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            $scope.data.currentQuestion.isCorrect = true;
            if (currentIndex >= ($scope.data.filteredQuestions.length - 1)) {
                alert('Great Job! You completed the set!');
                $scope.updateQuestions();
            }
        }
        else {
            $scope.data.currentQuestion.isCorrect = false;
        }
    }

    $scope.nextQuestion = function() {
        currentIndex += 1;
        $scope.data.currentQuestion = $scope.data.filteredQuestions[currentIndex];
        $scope.data.input = {};
    }

    $scope.showAnswer = function(input, answer) {
        input.answer = answer;
    }

    // Reset question set to first question
    $scope.updateQuestions = function() {
        currentIndex = 0;
        $scope.data.currentQuestion = $scope.data.filteredQuestions[currentIndex];
    }

    $scope.textToSpeech = function(text) {
        //var url = 'http://translate.google.com/translate_tts?tl=en&q=yahoo&client=t';
        //var source = $('#audio-source');
        //$http.defaults.headers.common['Referer'] = 'http://translate.google.com/';
        $http.defaults.headers["Referer"] = 'http://translate.google.com/';

        var audio = $("#my-audio");
        audio.attr('src', 'http://translate.google.com/translate_tts?tl=en&q=great&client=t');
        audio.trigger('pause');
        audio.trigger('load');
        audio.trigger('play');
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

        var filteredQuestions = _.filter($scope.data.conjugations, function(conjugation) {
            if (_.contains(pronounIds, conjugation.id) && _.contains(types, conjugation.verb.type.name)) {
                return true;
            }
        })

        $scope.data.filteredQuestions = filteredQuestions;
        $scope.updateQuestions();
    }

})

