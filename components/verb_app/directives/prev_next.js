var app = angular.module('verbApp');

verbApp.directive('prevNext', function(verbAppConstants, questionsService) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: verbAppConstants.templateDirectory + '/prev_next.html',
        link: function(scope, elem, attrs) {
            scope.questionsService = questionsService;

        }
    }
})