var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, menuOptions, verbs) {

    $scope.helperData = helperData;

    $scope.menuOptions = menuOptions;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;


    $scope.test = function() {
        var persons;
        _.filter($scope.helperData.pronounList, function(pronoun) {
            persons = _.filter( _.findWhere($scope.menuOptions, {title: 'person'}).options, {selected: true} );
        })
        debugger;
    }

})

