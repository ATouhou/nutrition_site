var verbApp = angular.module('verbApp');

// For checking user input against the correct answer. It compares every key the user enters with the correct answer
verbApp.directive('filterSection', function($timeout, verbAppConstants, filterOptions, questionsService) {
    return {
        restrict: 'E',
        templateUrl: verbAppConstants.templateDirectory + '/filter_section.html' ,
        scope: {
            options: '=',
            title: '@',
            disabled: '='
        },
        link: function(scope, elem, attr) {
            scope.filterOptions = filterOptions;
            scope.questions = questionsService;
        }
    }
})

