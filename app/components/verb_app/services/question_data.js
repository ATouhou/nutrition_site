var verbApp = angular.module('verbApp');

// Handles all service related to question objects
verbApp.factory('questionsService', function() {
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

    service.updateQuestions = function() {
        service.questionIndex = 0;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
    }

    return service;
})
