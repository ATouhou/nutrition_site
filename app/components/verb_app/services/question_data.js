var verbApp = angular.module('verbApp');

// Handles all data related to question objects
verbApp.factory('questionData', function() {
    var data = {};

    // Index of current question
    data.questionIndex;

    // Object to represent user input
    data.input = {};

    // List of initial unfiltered conjugations
    data.conjugations = [];

    data.clearInput = function() {
        data.input = {};
    }

    data.resetQuestions = function() {
        data.clearInput();
        data.currentQuestion.isCorrect = null;
        data.questionIndex = 0;
        data.currentQuestion = data.filteredQuestions[data.questionIndex];
    }

    data.nextQuestion = function() {
        data.questionIndex += 1;
        data.currentQuestion = data.filteredQuestions[data.questionIndex];
        data.clearInput();
    }

    data.updateQuestions = function() {
        data.questionIndex = 0;
        data.currentQuestion = data.filteredQuestions[data.questionIndex];
    }

    return data;
})
