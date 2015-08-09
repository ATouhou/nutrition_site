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
    //defective yaa example
    //var verb = {
    //    letter1: 'ن',
    //    letter2: 'س',
    //    letter3: 'ي',
    //    type: {
    //        name: 'defective',
    //        type: 'yaa (ya-aa)'
    //    },
    //    perfectVowel: 'ِ',
    //    imperfectVowel: 'ُ'
    //}

    //var verb = {
    //    letter1: 'ك',
    //    letter2: 'ت',
    //    letter3: 'ب',
    //    type: {
    //        name: 'sound'
    //    },
    //    perfectVowel: 'َ',
    //    imperfectVowel: 'ُ'
    //}

    //defective waaw example
    var verb = {
        letter1: 'د',
        letter2: 'ع',
        letter3: 'و',
        type: {
            name: 'defective',
            type: 'waaw'
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
    function getList() {
        var list = angular.copy(helperData.pronounList);
        _.forEach(list, function(pronoun, index) {
            switch (c.verb.type.name) {
                case 'sound': pronoun.perfect = getSoundVerb(pronoun.id); break;
                case 'geminate': pronoun.perfect = getGeminateVerb(pronoun.id); break;
                case 'hollow': pronoun.perfect = getHollowVerb(pronoun.id); break;
                case 'defective': pronoun.perfect = getDefectiveVerb(pronoun.id); break;
            }
        })
        return list
    }

    function getDefectiveVerb(id) {
        var verb;
        var soundVerb = getSoundVerb(id);

        if (hasConsonantEnding(id)) {
            verb = soundVerb;
        }
        else {
            switch (id) {
                case 5:
                    if (c.verb.type.type === 'yaa (ya-aa)') {
                        verb = soundVerb;
                    }
                    else {
                        var lastLetter = getDefectiveLastLetter();
                        verb = c.verb.letter1 + 'َ' + c.verb.letter2 + c.verb.perfectVowel + lastLetter;
                    }
                    break;
                case 7: verb = soundVerb; break;

                // Note, for 6, 8, 12 the waaw fathah/yaa fathah part of the root simply disappear so get the sound verb and just remove the waaw fathah using regex
                // But yaa fathah (ya-aa) acts like a sound verb here
                case 8:
                case 6:
                case 12:
                    if (c.verb.type.type === 'yaa (ya-aa)') {
                        verb = soundVerb;
                        break;
                    }
                    else {
                        // Group 1: first 4 chars, group 2: the chars that need to be removed, group 3: the rest of verb which we'll keep
                        var regex = new RegExp('(.{4})' + '(' + c.verb.letter3 + '.)' + '(.*)');
                        // Remove the middle group which disappears
                        verb = soundVerb.replace(regex, '$1$3');
                    }
            }
        }
        return verb;
    }

    function getDefectiveLastLetter() {
        switch (c.verb.type.type) {
            case 'waaw': return 'ا'; break;
            case 'yaa (aa-ii)': return 'ى'; break;
            case 'yaa (ya-aa)': return 'يَ'; break;
        }
    }

    function getHollowVerb(id) {
        // These pronouns keep the alif
        var verb;
        if (hasConsonantEnding(id)) {
            var shortVowel1;
            // This is for نام and خاف type verbs
            if (c.verb.type.type === 'alif') {
                shortVowel1 = 'ِ';
            }
            // This is for hollow waaw or hollow yaa verbs where the short vowel is based on the second root letter
            else {
                shortVowel1 = helperData.longToShort[c.verb.letter2];
            }
            verb = c.verb.letter1 + shortVowel1 + c.verb.letter3 + helperData.endings[id - 1];
        }
        else {
            verb = c.verb.letter1 + 'ا' + c.verb.letter3 + helperData.endings[id - 1];
        }
        return verb;
    }

    function getSoundVerb(id) {
        return c.verb.letter1 + 'َ'+ c.verb.letter2 + c.verb.perfectVowel + c.verb.letter3 + helperData.endings[id - 1];
    }

    function getGeminateVerb(id) {
        if (hasConsonantEnding(id)) {
            return getSoundVerb(id);
        }
        else {
            return c.verb.letter1 + 'َ' + c.verb.letter2 + 'ّ' + helperData.endings[id - 1];
        }
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


// Method to replace a char in a string by index
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
;var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', name: 'first person singular', perfect: ''},
                { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', perfect: ''},
                { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', perfect: ''},
                { id: 4, pronoun: 'أنْتُما', name: 'second person dual', perfect: ''},
                { id: 5, pronoun: 'هُوَ', name: 'third person masculine singular', perfect: ''},
                { id: 6, pronoun: 'هِيَ', name: 'third person feminine singular', perfect: ''},
                { id: 7, pronoun: 'هُما', name: 'third person masculine dual', perfect: ''},
                { id: 8, pronoun: 'هُما', name: 'third person feminine dual', perfect: '' },
                { id: 9, pronoun: 'نَحْنُ', name: 'first person plural', perfect: '' },
                { id: 10, pronoun: 'أَنْتُم', name: 'second person masculine plural', perfect: '' },
                { id: 11, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', perfect: '' },
                { id: 12, pronoun: 'هُم', name: 'third person masculine plural', perfect: '' },
                { id: 13, pronoun: 'هُنَّ', name: 'third person feminine plural', perfect: '' }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],

        endings: ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُمَا', 'َ', 'َتْ', 'َا', 'َتَا', 'ْنَا', 'ْتُمْ', 'ْتُنَّ', 'ُوْا', 'ْنَ'],

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


//defective waaw example
var verb = {
    letter1: 'د',
    letter2: 'ع',
    letter3: 'و',
    type: {
        name: 'defective',
        type: 'waaw'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

//defective yaa example
var verb = {
    letter1: 'م',
    letter2: 'ش',
    letter3: 'ي',
    type: {
        name: 'defective',
        type: 'yaa (aa-ii)'
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
