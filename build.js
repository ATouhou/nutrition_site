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
    var verb = {
        letter1: 'د',
        letter2: 'ر',
        letter3: 'س',
        type: 'sound',
        perfectVowel: 'َ',
        imperfectVowel: 'ُ'
    }

    var options = {
        form: 1,
        person: 'thirdPerson',
        gender: 'feminine',
        number: 'plural',
        tense: 'perfect'
    }
    $scope.conjugator = conjugator;

    $scope.conjugator.initialize(verb, options);
})
;var verbApp = angular.module('verbApp');

verbApp.factory('conjugator', function() {
    //c stands for conjugator
    var c = {};

    var tenses = ['perfect', 'imperfect', 'imperative', 'jussive', 'subjunctive'];
    var forms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var persons = ['firstPerson', 'secondPerson', 'thirdPerson'];
    var types = ['sound', 'hollow', 'geminate', 'weakLam'];
    var genders = ['masculine', 'feminine'];
    var numbers = ['singular', 'dual', 'plural'];

    c.verb;
    c.options;
    c.list;

    c.initialize = function(verb, options) {
        c.verb = verb;
        c.options = options;
        c.list = getList();
    }

    c.getVerb = function() {
        // focus on perfect, sound verbs for now
        var base = c.verb.letter1 + 'َ'+ c.verb.letter2 + c.verb.perfectVowel;
        return base + _.findWhere(c.list, {name: c.getName()}).endings.perfect;
    }

    // c is the complete name of the conjugation e.g. "first person masculine singular perfect"
    c.getName = function() {
        var name = _.startCase(c.options.person);
        if (c.options.gender) {
            name += ' ' + c.options.gender;
        }
        name += ' ' + c.options.number
        return name.toLowerCase();
    }

    // Private methods
    function getList() {
        console.log('trying to get list');
        return [
                    { id: 1, pronoun: 'أنا', name: 'first person singular', endings: {perfect: c.verb.letter3 + 'ْتُ'} },
                    { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', endings: {perfect:c.verb.letter3 + 'ْتَ'} },
                    { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', endings: {perfect: c.verb.letter3 + 'ْتِ'} },
                    { id: 4, pronoun: 'أنْتُما', name: 'second person masculine dual', endings: {perfect: c.verb.letter3 + 'ْتُما'} },
                    { id: 5, pronoun: 'أَنْتُما', name: 'second person feminine dual', endings: {perfect: c.verb.letter3 + 'ْتُما'} },
                    { id: 6, pronoun: 'هُوَ', name: 'third person masculine singular', endings: {perfect: c.verb.letter3 + 'َ'} },
                    { id: 7, pronoun: 'هِيَ', name: 'third person feminine singular', endings: {perfect: c.verb.letter3 + 'َ'+ 'تْ'} },
                    { id: 8, pronoun: 'هُما', name: 'third person masculine dual', endings: {perfect: c.verb.letter3 + 'ا'} },
                    { id: 9, pronoun: 'هُما', name: 'third person feminine dual', endings: {perfect: c.verb.letter3 + 'ا'} },
                    { id: 10, pronoun: 'نَحْنُ', name: 'first person plural', endings: {perfect: c.verb.letter3 + 'ْنا'} },
                    { id: 11, pronoun: 'أَنْتُم', name: 'second person masculine plural', endings: {perfect: c.verb.letter3 + 'تُم'} },
                    { id: 12, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', endings: {perfect: c.verb.letter3 + 'ْتُنَّ'} },
                    { id: 13, pronoun: 'هُم', name: 'third person masculine plural', endings: {perfect: c.verb.letter3 + 'وا'} },
                    { id: 14, pronoun: 'هُنَّ', name: 'third person feminine plural', endings: {perfect: c.verb.letter3 + 'ْنَ'} }
        ]

    }

    return c;
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
