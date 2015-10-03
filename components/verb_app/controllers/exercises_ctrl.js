var app = angular.module('verbApp');

app.controller('exercisesCtrl', function($scope, questionsService, thackstonExercises) {

    $scope.questionsService = questionsService;

    $scope.chapterData = {}
    $scope.chapterData.chapters = thackstonExercises.chapters;
    $scope.chapterData.selectedChapter = $scope.chapterData.chapters;

    questionsService.questions = thackstonExercises.exercises;

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    questionsService.filteredQuestions = questionsService.questions;

    // Set the current question
    questionsService.questionIndex = 0;
    questionsService.currentQuestion = questionsService.filteredQuestions[questionsService.questionIndex];
})

