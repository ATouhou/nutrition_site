var app = angular.module('arabicSite', ['ui.router', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

;var verbApp = angular.module('verbApp', [])
;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {


})
;var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator) {

    $scope.conjugator = conjugator;

    var verb = {
        letter1: 'د',
        letter2: 'ر',
        letter3: 'س',
        type: 'sound',
        perfectVowel: 'َ',
        imperfectVowel: 'ُ'
    }

    $scope.conjugator.setVerb(verb);
})
;var verbApp = angular.module('verbApp');


verbApp.service('conjugator', function() {

    var tenses = ['perfect', 'imperfect', 'imperative', 'jussive', 'subjunctive'];

    var forms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var persons = ['first', 'second', 'third'];

    var types = ['sound', 'hollow', 'geminate', 'weakLam'];

    var genders = ['masculine', 'feminine'];

    var numbers = ['singular', 'plural'];

    this.setVerb = function(verb) {
        this.verb = verb;
    }

    this.perfectForm = function() {
        return this.verb.letter1 + this.verb.perfectVowel + this.verb.letter2 + 'َ'+ this.verb.letter3 + 'َ';
    }

    //conjugate('perfect', 1, 'firstPerson', 'plural');
})

;app.config(function($stateProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/home");

    // Now set up the states
    $stateProvider
        // This is the root state. Every other state is a child of this state (directly or indirectly).
        .state('main', {
            url: '/main',
            templateUrl: '/app/components/root/templates/index.html',
            controller: 'rootCtrl'
        })

        .state('main.verbApp', {
            url: '/verb_app',
            templateUrl: '/app/components/verb_app/templates/index.html',
            controller: 'verbAppCtrl'
        })

})
