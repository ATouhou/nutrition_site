var verbApp = angular.module('verbApp');

// For checking user input against the correct answer. It compares every key the user enters with the correct answer
verbApp.directive('answerProgress', function($timeout) {
    return {
        restrict: 'A',
        //templateUrl: '',
        scope: {
            answer: '=',
            userInput: '='
        },
        link: function(scope, elem, attrs) {
            elem.bind('keyup', function(event) {
                var userLetters = scope.userInput.answer.split('');
                var letters = scope.answer.split('').slice(0, userLetters.length);
                $timeout(function() {
                    if (_.isEqual(userLetters, letters)) {
                        console.log('correct');
                        scope.userInput.error = false;
                    }
                    else {
                        console.log('error');
                        scope.userInput.error = true;
                    }
                })
            })
        }
    }
})
