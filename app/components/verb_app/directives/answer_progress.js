var verbApp = angular.module('verbApp');

// For checking user input against the correct answer. It compares every key the user enters with the correct answer
verbApp.directive('answerProgress', function($timeout) {
    return {
        restrict: 'A',
        //templateUrl: '',
        scope: {
            answer: '=',
            questionObj: '='
        },
        link: function(scope, elem, attrs) {
            elem.bind('keyup', function(event) {
                // Compare the number of chars input by the user with that many chars in the answer
                var userLetters = scope.questionObj.userAnswer.split('');
                var letters = scope.answer.split('').slice(0, userLetters.length);
                $timeout(function() {
                    if (_.isEqual(userLetters, letters)) {
                        scope.questionObj.userError = false;
                    }
                    else {
                        scope.questionObj.userError = true;
                    }
                })
            })
        }
    }
})
