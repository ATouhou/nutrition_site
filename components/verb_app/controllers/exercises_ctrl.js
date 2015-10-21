var app = angular.module('verbApp');

app.controller('exercisesCtrl', function($scope, questionsService, thackstonExercises, $http) {
    $scope.questionsService = questionsService;
    questionsService.initialize();

    $scope.chapterData = {}
    $scope.chapterData.chapters = thackstonExercises.chapters;
    $scope.chapterData.selectedChapter = $scope.chapterData.chapters[0];

    questionsService.questions = thackstonExercises.exercises;

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    questionsService.filteredQuestions = questionsService.questions;

    // Set the current question
    questionsService.questionIndex = 0;
    questionsService.currentQuestion = questionsService.filteredQuestions[questionsService.questionIndex];

    $scope.setFilter = function() {
        questionsService.filteredQuestions = _.filter(questionsService.questions, {'chapter': $scope.chapterData.selectedChapter.name});
        questionsService.updateQuestions();
    }

    $scope.setFilter();

    // todo: write these results to a file
    //$http.get('/static/thackston_exercises.txt')
    //    .success(function(data) {
    //        var lines = data.split("\n");
    //
    //        for (var i = 0; i < lines.length; i = i + 2) {
    //            console.log(
    //                JSON.stringify({
    //                    question: lines[i],
    //                    answer: lines[i+1],
    //                    chapter: 1
    //                })
    //            );
    //        }
    //    })

})

