var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, menuOptions, verbs) {
    $scope.input = {};

    $scope.helperData = helperData;

    $scope.pronounList = helperData.pronounList;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    $scope.conjugations = [];

    _.forEach($scope.verbs, function(verb) {
        var conjugationSet = conjugator.getConjugations(verb);
        // Add the verb object to it's conjugation set
        _.forEach(conjugationSet, function(cSet) {
            cSet.verb = verb;
        })
        $scope.conjugations = $scope.conjugations.concat(conjugationSet);
    })

    // Add pronoun so as to keep track of which conjugations are selected
    _.forEach($scope.conjugations, function(conjugation, index) {
        //conjugation.verb = _.findWhere($scope.verbs, {})
        conjugation.menuItem = _.findWhere($scope.pronounList, {id: conjugation.id});
    })

    var currentIndex = 0;
    $scope.currentConjugation = $scope.conjugations[currentIndex];

    $scope.submit = function(userAnswer, answer) {
        if (userAnswer === answer) {
            alert('correct');
            $scope.next();
        }
        else {
            alert('wrong answer');
        }
    }

    $scope.next = function() {
        currentIndex += 1;
        $scope.currentConjugation = $scope.conjugations[currentIndex];
        $scope.input = {};
    }

    $scope.showAnswer = function(input, answer) {
        input.answer = answer;
    }

    //$scope.isSelected = function(item) {
    //    if (item.menuItem.selected) {
    //        return true;
    //    }
    //    else {
    //        return false;
    //    }
    //}

})

