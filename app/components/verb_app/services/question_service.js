var verbApp = angular.module('verbApp');

// The primary service which deals with handling questions, checking answers, etc
verbApp.factory('questionsService', function(alertService, filterOptions) {
    var service = {};

    // Index of current question
    service.questionIndex;

    // List of initial unfiltered conjugations
    service.conjugations = [];

    service.clearInput = function() {
        service.input = {};
    }

    service.resetQuestions = function() {
        alertService.clear();
        service.questionIndex = 0;
        service.filteredQuestions = angular.copy(service.conjugations);
        service.currentQuestion = service.filteredQuestions[0];
        filterOptions.reset();
    }

    service.nextQuestion = function() {
        service.questionIndex += 1;
        if (service.questionIndex >= service.filteredQuestions.length) {
            service.questionIndex = 0;
        }
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
        service.clearInput();
    }

    service.previousQuestion = function() {
        service.questionIndex -= 1;
        if (service.questionIndex < 0) {
            service.questionIndex = service.filteredQuestions.length - 1;
        }
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
        service.clearInput();
    }

    // Reset question set to first question
    service.updateQuestions = function() {
        service.questionIndex = 0;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
    }

    service.showAnswer = function(question, answer) {
        question.userAnswer = answer;
    }

    service.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            service.currentQuestion.isCorrect = true;
            // check if all are correct, if so, then show the alert!
            if (_.every(service.filteredQuestions, {isCorrect: true})) {
                alertService.set('setCompleted', 'You have completed all the questions in the set!');
            }
        }
        else {
            service.currentQuestion.isCorrect = false;
        }
    }

    return service;
})
