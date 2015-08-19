var verbApp = angular.module('verbApp');

verbApp.directive('answerProgress', function() {
    return {
        restrict: 'A',
        //templateUrl: '',
        scope: {
            answer: '=',
            userAnswer: '='
        },
        link: function(scope, elem, attrs) {
            elem.bind('keyup', function(event) {
                var userLetters = scope.userAnswer.split('');
                var letters = scope.answer.split('').slice(0, userLetters.length);
                if (_.isEqual(userLetters, letters)) {
                    console.log('keep going');
                }
                else {
                    console.log('doh!');
                }

                // why is it being hit so many times?
            })
        }
    }
})
