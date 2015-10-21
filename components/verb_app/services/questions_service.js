var verbApp = angular.module('verbApp');

// The primary service which deals with handling questions, checking answers, etc
verbApp.factory('questionsService', function(alertService, filterOptions) {
    var service = {};

    // Index of current question
    service.questionIndex;

    // List of initial unfiltered questions
    service.questions = [];
    service.filteredQuestions = [];

    service.initialize = function() {
        service.questionIndex = 0;
        service.currentQuestion = undefined;
        service.questions = [];
        service.filteredQuestions = [];
    }

    service.resetQuestions = function() {
        alertService.clear();
        filterOptions.reset();
        this.questionIndex = 0;

        this.questions = _.map(this.questions, function(item) {
            // This gets rid the of those two properties which need to be cleared when user resets the questions
            return _.omit(item, ['isCorrect', 'userAnswer']);
        })

        this.filteredQuestions = this.questions;
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    service.nextQuestion = function() {
        this.questionIndex += 1;
        if (this.questionIndex >= this.filteredQuestions.length) {
            this.questionIndex = 0;
        }
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    service.previousQuestion = function() {
        this.questionIndex -= 1;
        if (this.questionIndex < 0) {
            this.questionIndex = this.filteredQuestions.length - 1;
        }
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    // Reset question set to first question
    service.updateQuestions = function() {
        this.questionIndex = 0;
        this.currentQuestion = this.filteredQuestions[this.questionIndex];
    }

    service.showAnswer = function(question, answer) {
        question.userAnswer = answer;
    }

    service.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            this.currentQuestion.isCorrect = true;
            this.currentQuestion.userError = false;
            // check if all are correct, if so, then show the alert!
            if (_.every(this.filteredQuestions, {isCorrect: true})) {
                alertService.set('setCompleted', 'You have completed all the questions in the set!');
            }
        }
        else {
            this.currentQuestion.isCorrect = false;
        }
    }

    service.showNextLetter = function(question) {
        // If nothing has been entered
        if (!question.userAnswer) {
            question.userAnswer = question.answer[0];
        }
        else {
            var userAnswer = question.userAnswer.split('');
            var answer = question.answer.split('');

            var userCorrect = [];
            _.forEach(userAnswer, function(userLetter, index) {
                if (userLetter === answer[index]) {
                    userCorrect.push(userLetter);
                }
            })

            userCorrect.push(answer[userCorrect.length]);
            question.userAnswer = userCorrect.join('');
        }
    }

    return service;
})
