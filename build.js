var app = angular.module('arabicSite', ['ui.router', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

;var verbApp = angular.module('verbApp', [])
;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {


})
;var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, pronounList) {
    var verb = {
        letter1: 'ك',
        letter2: 'ت',
        letter3: 'ب',
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

    $scope.pronounList = pronounList;
})
;var verbApp = angular.module('verbApp');

verbApp.factory('conjugator', function(pronounList) {
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

    c.getVerb = function(verbName) {
        // focus on perfect, sound verbs for now
        // base is the same for all perfect verbs
        var base = c.verb.letter1 + 'َ'+ c.verb.letter2 + c.verb.perfectVowel;

        // concatenate the ending of the appropriate verb with the base
        return base + _.findWhere(c.list, {name: verbName}).endings.perfect;
    }


    // get the complete name of the conjugation e.g. "first person masculine singular perfect" based on the options already specified
    c.getName = function() {
        var name = _.startCase(c.options.person);
        if (c.options.gender) {
            name += ' ' + c.options.gender;
        }
        name += ' ' + c.options.number
        return name.toLowerCase();
    }

    //*******************************************
    // Private methods
    //*******************************************
    function getList() {
        var list = angular.copy(pronounList);
        var endings = ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُما', 'ْتُما', 'َ', 'تْ', 'ا', 'ا', 'ْنا', 'تُم', 'ْتُنَّ', 'وا', 'ْنَ'];
        _.forEach(endings, function(ending, index) {
            list[index].endings.perfect = c.verb.letter3 + ending;
        })
        return list;
    }
    return c;
})

;var verbApp = angular.module('verbApp');

verbApp.value('pronounList', [
        { id: 1, pronoun: 'أنا', name: 'first person singular', endings: {} },
        { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', endings: {} },
        { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', endings: {} },
        { id: 4, pronoun: 'أنْتُما', name: 'second person masculine dual', endings: {} },
        { id: 5, pronoun: 'أَنْتُما', name: 'second person feminine dual', endings: {} },
        { id: 6, pronoun: 'هُوَ', name: 'third person masculine singular', endings: {} },
        { id: 7, pronoun: 'هِيَ', name: 'third person feminine singular', endings: {} },
        { id: 8, pronoun: 'هُما', name: 'third person masculine dual', endings: {} },
        { id: 9, pronoun: 'هُما', name: 'third person feminine dual', endings: {} },
        { id: 10, pronoun: 'نَحْنُ', name: 'first person plural', endings: {} },
        { id: 11, pronoun: 'أَنْتُم', name: 'second person masculine plural', endings: {} },
        { id: 12, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', endings: {} },
        { id: 13, pronoun: 'هُم', name: 'third person masculine plural', endings: {} },
        { id: 14, pronoun: 'هُنَّ', name: 'third person feminine plural', endings: {} }
    ]
);app.config(function($stateProvider) {
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
