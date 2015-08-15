var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, menuOptions, verbs) {

    $scope.helperData = helperData;

    $scope.pronounList = helperData.pronounList;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    _.forEach($scope.verbs, function(verb) {
        verb.conjugations = conjugator.getConjugations(verb);
    })

    $scope.checkSelected = function(item) {
        var selectedPronouns = _.pluck(_.filter($scope.pronounList, {selected: true}), 'id');
        var isSelected = _.contains(selectedPronouns, item.id);
        return isSelected;
    }
})

