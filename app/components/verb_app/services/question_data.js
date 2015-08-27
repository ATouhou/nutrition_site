var verbApp = angular.module('verbApp');

// The primary service which deals with handling questions, checking answers, etc
verbApp.factory('questionsService', function(alertService) {
    var service = {};

    // Index of current question
    service.questionIndex;

    // Object to represent user input
    service.input = {};

    // List of initial unfiltered conjugations
    service.conjugations = [];

    service.clearInput = function() {
        service.input = {};
    }

    service.resetQuestions = function() {
        service.clearInput();
        service.currentQuestion.isCorrect = null;
        service.questionIndex = 0;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
    }

    service.nextQuestion = function() {
        service.questionIndex += 1;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
        service.clearInput();
    }

    // Reset question set to first question
    service.updateQuestions = function() {
        service.questionIndex = 0;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
    }

    service.showAnswer = function(input, answer) {
        input.answer = answer;
    }

    service.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            service.currentQuestion.isCorrect = true;
            if (service.questionIndex >= (service.filteredQuestions.length - 1)) {
                service.resetQuestions();
                alertService.set('setCompleted', 'You have completed all the questions in the set!');
            }
        }
        else {
            service.currentQuestion.isCorrect = false;
        }
    }

    return service;
})
