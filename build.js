var app = angular.module('arabicSite', ['ui.router', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

;var verbApp = angular.module('verbApp', [])
;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {


})
;var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData) {
    // sound example
    //var verb = {
    //    letter1: 'د',
    //    letter2: 'ع',
    //    letter3: 'و',
    //    type: {name: 'defective', type: 'waaw'},
    //    perfectVowel: 'َ',
    //    imperfectVowel: 'ُ'
    //}

    var verb = {
        letter1: 'ك',
        letter2: 'ت',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
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

    $scope.helperData = helperData;

    // selections made by the user
    $scope.userInput = {};

    $scope.generateVerbs = function(userInput) {
        if (userInput.letter1 && userInput.letter2 && userInput.letter3 && userInput.perfectVowel && userInput.type) {
            $scope.conjugator.setVerb(userInput);
        }
    }
})
;var verbApp = angular.module('verbApp');

verbApp.factory('conjugator', function(helperData) {
    //c stands for conjugator
    var c = {};

    var tenses = ['perfect', 'imperfect', 'imperative', 'jussive', 'subjunctive'];
    var forms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var persons = ['firstPerson', 'secondPerson', 'thirdPerson'];
    var types = ['sound', 'hollow', 'geminate', 'weakLam', 'assimilated'];
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

    c.setVerb = function(verb) {
        c.verb = verb;
        c.list = getList();
    }

    c.getVerb = function(pronoun) {
        // focus on perfect verbs for now
        var base;

        // sound and assimilated are the same in perfect tense
        if (c.verb.type.name === 'sound' || c.verb.type.name === 'assimilated') {
            base = getSoundBase(pronoun);
        }

        // hollow
        if (c.verb.type.name === 'hollow') {
            base = getHollowBase(pronoun);
        }

        if (c.verb.type.name === 'geminate') {
            base = getGeminateBase(pronoun);
        }

        if (c.verb.type.name === 'defective') {
            base = getDefectiveBase(pronoun);
        }

        // concatenate the ending of the appropriate verb with the base
        return base + _.findWhere(c.list, {name: pronoun.name}).endings.perfect;
    }


    // get the complete name of the conjugation e.g. "first person masculine singular perfect" based on the options already specified
    c.getName = function() {
        var name = _.startCase(c.options.person);
        // first person does not have gender so account for that
        if (c.options.gender) {
            name += ' ' + c.options.gender;
        }
        name += ' ' + c.options.number
        return name.toLowerCase();
    }

    //*******************************************
    // Private methods
    //*******************************************

    function getDefectiveBase(pronoun) {
        var base;
        if (pronoun.id === 5) {
            base = c.verb.letter1 + 'َ'+ c.verb.letter2 + 'ا';
        }
        else {
            base = getSoundBase(pronoun);
        }

        return base;



        //if (c.verb.type.type === 'waaw') {
        //    if (hasConsonantEnding(pronoun.id)) {
        //        base = getSoundBase(pronoun);
        //    }
        //    else {
        //        if (pronoun.id === 5) {
        //
        //        }
        //    }
        //}

    }

    function getHollowBase(pronoun) {
        // These persons keep the alif
        var base;
        if (hasConsonantEnding(pronoun.id)) {
            base = c.verb.letter1 + 'ا' + c.verb.letter3;
        }
        else {
            var shortVowel1;
            // This is for نام and خاف type verbs
            if (c.verb.type.type === 'alif') {
                shortVowel1 = 'ِ';

            }
            // This is for hollow waaw or hollow yaa verbs
            else {
                shortVowel1 = helperData.longToShort[c.verb.letter2];
            }
            base = c.verb.letter1 + shortVowel1 + c.verb.letter3;
        }
        return base;
    }

    function getGeminateBase(pronoun) {
        var base;
        if (hasConsonantEnding(pronoun.id)) {
            base = getSoundBase(pronoun);
        }
        else {
            base = c.verb.letter1 + 'َ' + c.verb.letter2 + 'ّ';
        }
        return base;
    }

    function getSoundBase(pronoun) {
        return c.verb.letter1 + 'َ'+ c.verb.letter2 + c.verb.perfectVowel;
    }

    // Grab and copy pronounList and add the endings for each verb
    function getList() {
        var list = angular.copy(helperData.pronounList);

        _.forEach(helperData.endings, function(ending, index) {
            if (c.verb.type.name === 'sound' || (c.verb.type.name === 'geminate' && hasConsonantEnding(index + 1))) {
                list[index].endings.perfect = c.verb.letter3 + ending;
            }
            else if (c.verb.type.name === 'hollow' || c.verb.type.name === 'geminate') {
                list[index].endings.perfect = ending;
            }

        })

        return list;
    }

    // 1 - 4, 9, 10, 11, 13 have consonant endings
    function hasConsonantEnding(id) {
        if (_.includes([5,6,7,8,12], id)) {
            return false;
        }
        else {
            return true;
        }
    }


    return c;
})

;var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', name: 'first person singular', endings: {} },
                { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', endings: {} },
                { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', endings: {} },
                { id: 4, pronoun: 'أنْتُما', name: 'second person dual', endings: {} },
                { id: 5, pronoun: 'هُوَ', name: 'third person masculine singular', endings: {} },
                { id: 6, pronoun: 'هِيَ', name: 'third person feminine singular', endings: {} },
                { id: 7, pronoun: 'هُما', name: 'third person masculine dual', endings: {} },
                { id: 8, pronoun: 'هُما', name: 'third person feminine dual', endings: {} },
                { id: 9, pronoun: 'نَحْنُ', name: 'first person plural', endings: {} },
                { id: 10, pronoun: 'أَنْتُم', name: 'second person masculine plural', endings: {} },
                { id: 11, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', endings: {} },
                { id: 12, pronoun: 'هُم', name: 'third person masculine plural', endings: {} },
                { id: 13, pronoun: 'هُنَّ', name: 'third person feminine plural', endings: {} }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],

        endings: ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُما', 'َ', 'َتْ', 'ا', 'َتا', 'ْنا', 'ْتُمْ', 'ْتُنَّ', 'وا', 'ْنَ'],

        shortVowels: [{vowel: 'َ', name: 'fatha'}, {vowel: 'ُ', name: 'dammah'}, {vowel: 'ِ', name: 'kasrah'}],

        // hash for going from waaw to kasrah, alif to fatha, etc
        longToShort: {'و': 'ُ', 'ي': 'ِ', 'ا': 'َ'},

        types: [{name: 'sound'}, {name: 'geminate'}, {name: 'hollow', type: 'waaw'},
                {name: 'hollow', type: 'yaa'}, {name: 'hollow', type: 'alif'},
                {name: 'assimilated'},
                {name: 'defective', type: 'waaw'}, {name: 'defective', type: 'yaa (aa-ii)'}, {name: 'defective', type: 'yaa (ya-aa)'}]
    }
);// sound example
var verb = {
    letter1: 'ك',
    letter2: 'ت',
    letter3: 'ب',
    type: {
        name: 'sound'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}


//hollow waaw example
var verb = {
    letter1: 'ق',
    letter2: 'و',
    letter3: 'ل',
    type: {
        name: 'hollow',
        type: 'waaw'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

//geminate example
var verb = {
    letter1: 'د',
    letter2: 'ل',
    letter3: 'ل',
    type: {
        name: 'geminate'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}
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
