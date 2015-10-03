var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, filterOptions, verbs, questionsService, alertService, verbAppConstants) {
    $scope.questions = questionsService;

    $scope.alert = alertService;

    $scope.helperData = helperData;

    $scope.filterOptions = filterOptions;
    filterOptions.reset();

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    $scope.templateDirectory = verbAppConstants.templateDirectory;

    _.forEach($scope.verbs, function(verb) {
        var conjugationSet = conjugator.getConjugations(verb);
        // Add the verb object to it's conjugation set
        _.forEach(conjugationSet, function(cSet) {
            cSet.verb = verb;
        })
        $scope.questions.questions = $scope.questions.questions.concat(conjugationSet);
    })

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    $scope.questions.filteredQuestions = $scope.questions.questions;

    // Set the current question
    $scope.questions.questionIndex = 0;
    $scope.questions.currentQuestion = $scope.questions.filteredQuestions[$scope.questions.questionIndex];

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

        var filteredQuestions = _.filter($scope.questions.questions, function(conjugation) {
            if (_.contains(pronounIds, conjugation.id) && _.contains(types, conjugation.verb.type.name)) {
                return true;
            }
        })

        if (filteredQuestions.length === 0) {
            alertService.set('noMatches', 'There are no questions that match your selected filters. Modify your filters to see more questions.');
        }
        else {
            alertService.clear();
            $scope.questions.filteredQuestions = filteredQuestions;
            $scope.questions.updateQuestions();
        }
    }

})

//$scope.textToSpeech = function(text) {
//    var audio = $("#my-audio");
//    audio.attr('src', 'http://translate.google.com/translate_tts?tl=en&q=great&client=t');
//    audio.trigger('pause');
//    audio.trigger('load');
//    audio.trigger('play');
//}

