var app = angular.module('arabicSite', ['ui.router', 'ngAnimate', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

;var verbApp = angular.module('verbApp', [])
;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {
    $scope._ = _;


})

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

;var verbApp = angular.module('verbApp');

verbApp.controller('conjugatorCtrl', function($scope, conjugator, hamzatedWord, helperData) {
    // hamzated example
    var verb = {
        letter1: 'ق',
        letter2: 'ر',
        letter3: 'ء',
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

verbApp.controller('verbAppCtrl', function($scope, conjugator, helperData, filterOptions, verbs, questionsService, alertService) {
    $scope.questions = questionsService;

    $scope.alert = alertService;

    $scope.helperData = helperData;

    $scope.filterOptions = filterOptions;

    $scope.verbs = verbs;

    $scope.conjugator = conjugator;

    $scope.templateDirectory = '/app/components/verb_app/templates';

    _.forEach($scope.filterOptions.pronouns, function(pronoun) {
        pronoun.selected = true;
    })

    _.forEach($scope.filterOptions.types, function(type) {
        type.selected = true;
    })

    _.forEach($scope.verbs, function(verb) {
        var conjugationSet = conjugator.getConjugations(verb);
        // Add the verb object to it's conjugation set
        _.forEach(conjugationSet, function(cSet) {
            cSet.verb = verb;
        })
        $scope.questions.conjugations = $scope.questions.conjugations.concat(conjugationSet);
    })

    // Create a shallow copy so that changes to filteredQuestions do not affect the original conjugation list
    // filteredQuestions will be the deck used to display the questions
    $scope.questions.filteredQuestions = angular.copy($scope.questions.conjugations);

    // Set the current question
    $scope.questions.questionIndex = 0;
    $scope.questions.currentQuestion = $scope.questions.filteredQuestions[$scope.questions.questionIndex];

    $scope.resetQuestions = function() {
        alertService.clear();
    }

    // This is run if there is any change to any of the filters
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            filterQuestions();
        }
    }, true)

    // This is the function that basically filters the question set
    function filterQuestions() {
        var pronounIds = _.pluck(_.filter($scope.filterOptions.pronouns, {selected: true}), 'id');
        var types = _.pluck(_.filter($scope.filterOptions.types, {selected: true}), 'name');

        var filteredQuestions = _.filter($scope.questions.conjugations, function(conjugation) {
            if (_.contains(pronounIds, conjugation.id) && _.contains(types, conjugation.verb.type.name)) {
                return true;
            }
        })

        if (filteredQuestions.length === 0) {
            alertService.set('noMatches', 'There are no questions that match your selected filters. Modify your filters to see more questions.');
        }
        else {
            alertService.clear();
            $scope.questions.clearInput();
            $scope.questions.filteredQuestions = filteredQuestions;
            $scope.questions.updateQuestions();
        }
    }

})

//$scope.textToSpeech = function(text) {
//    var audio = $("#my-audio");
//    audio.attr('src', 'http://translate.google.com/translate_tts?tl=en&q=great&client=t');
//    audio.trigger('pause');
//    audio.trigger('load');
//    audio.trigger('play');
//}

;var verbApp = angular.module('verbApp');

// For checking user input against the correct answer. It compares every key the user enters with the correct answer
verbApp.directive('answerProgress', function($timeout) {
    return {
        restrict: 'A',
        //templateUrl: '',
        scope: {
            answer: '=',
            questionObj: '='
        },
        link: function(scope, elem, attrs) {
            elem.bind('keyup', function(event) {
                // Compare the number of chars input by the user with that many chars in the answer
                var userLetters = scope.questionObj.userAnswer.split('');
                var letters = scope.answer.split('').slice(0, userLetters.length);
                $timeout(function() {
                    if (_.isEqual(userLetters, letters)) {
                        scope.questionObj.userError = false;
                    }
                    else {
                        scope.questionObj.userError = true;
                    }
                })
            })
        }
    }
})
;var verbApp = angular.module('verbApp');

verbApp.factory('conjugator', function(helperData, hamzatedWord) {
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
        c.list = getList();
    }

    c.setVerb = function(verb) {
        c.verb = verb;
        c.list = getList();
    }

    // get the complete name of the conjugation e.g. "first person masculine singular perfect" based on the options already specified
    c.getName = function(item) {
        var name = _.startCase(item.person);
        // first person does not have gender so account for that
        if (item.gender) {
            name += ' ' + item.gender;
        }
        name += ' ' + item.number
        return name.toLowerCase();
    }

    c.getConjugations = function(verb) {
        c.verb = verb;
        return getList();
    }

    // Just get a single verb
    c.getVerb = function(verb, id) {
        c.verb = verb;
        var conjugatedVerb;
        switch (c.verb.type.name) {
            case 'sound': conjugatedVerb = getSoundVerb(id); break;
            case 'geminate': conjugatedVerb = getGeminateVerb(id); break;
            case 'hollow': conjugatedVerb = getHollowVerb(id); break;
            case 'defective': conjugatedVerb = getDefectiveVerb(id); break;
        }
        return conjugatedVerb;
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
                //case 'hamzated': pronoun.perfect = getHamzatedVerb(pronoun.id); break;
            }
            if (anyHamzas()) {
                pronoun.perfect = hamzatedWord.getWord(pronoun.perfect);
            }
        })
        return list
    }

    function anyHamzas() {
        if (c.verb.letter1 === 'ء' || c.verb.letter2 === 'ء' || c.verb.letter3 === 'ء') {
            return true;
        }
        else {
            return false;
        }
    }

    function getDefectiveVerb(id) {
        var verb;
        var soundVerb = getSoundVerb(id);

        if (hasConsonantEnding(id)) {
            verb = soundVerb;
        }
        else if (c.verb.type.type === 'yaa (ya-aa)') {
            verb = getDefectiveType3(id, soundVerb);
        }
        else {
            verb = getDefectiveType1(id, soundVerb);
        }
        return verb;
    }

    function getDefectiveType3(id, soundVerb) {
        // nasiya type verbs are conjugated like sound verbs except for number 12
        var verb;
        if (id === 12) {
            verb = c.verb.letter1 + 'َ' + c.verb.letter2 + 'ُوْا';
        }
        else {
            verb = soundVerb;
        }
        return verb;
    }

    function getDefectiveType1(id, soundVerb) {
        var verb;
        switch (id) {
            case 5:
                var lastLetter = getDefectiveLastLetter();
                verb = c.verb.letter1 + 'َ' + c.verb.letter2 + c.verb.perfectVowel + lastLetter;
                break;
            case 7: verb = soundVerb; break;

            // Note, for 6, 8, 12 the waaw fathah/yaa fathah part of the root simply disappear so get the sound verb and just remove the waaw fathah using regex
            // But yaa fathah (ya-aa) acts like a sound verb here
            case 8:
            case 6:
            case 12:
                // Group 1: first 4 chars, group 2: the chars that need to be removed, group 3: the rest of verb which we'll keep
                var regex = new RegExp('(.{4})' + '(' + c.verb.letter3 + '.)' + '(.*)');
                // Remove the middle group which disappears
                verb = soundVerb.replace(regex, '$1$3');
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
            verb = c.verb.letter1 + 'َا' + c.verb.letter3 + helperData.endings[id - 1];
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

verbApp.factory('filterOptions', function(helperData) {
    var filterOptions = {};

    filterOptions.types = [{name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]
    filterOptions.pronouns = angular.copy(helperData.pronounList);
    filterOptions.forms = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}]

    filterOptions.allTypes = true;
    filterOptions.allPronouns = true;

    // Select or deselect all options of a particular filter
    filterOptions.toggleAll = function(type, value) {
        _.forEach(this[type], function(item) {
            item.selected = value;
        })
    }

    return filterOptions;
})

;var verbApp = angular.module('verbApp');

// Take any word with hamza and put it on the its correct seat
verbApp.factory('hamzatedWord', function() {
    var factory = {};

    // Make wordArray and indexes available to all functions
    var wordArray;
    var indexes;

    factory.getWord = function(word) {
        // Get an array of indexes where hamza is present [0,3] for example
        wordArray = word.split('');
        indexes = getCharIndexes('ء', wordArray);

        checkFirstLetter();

        // Check if there hamzas beyond the first letter
        var moreHamzas = _.some(indexes, function(index) {
            return index > 0;
        })

        if (moreHamzas) {
            _.forEach(indexes, function(index) {
                // This represents the penultimate letter where the case ending is present (or last letter of you think of the case ending as a vowel)
                if (wordArray[wordArray.length - 2] === 'ء') {
                   checkFinalHamza(index);
                }

                else if (isMedialAloof(index)) {}

                else if (wordArray[index + 2] === 'ا') {
                    checkMadd(index);
                }
                else {
                    checkMedialRegular(index);
                }
            })
        }

        return wordArray.join('');
    }

    function checkMadd(index) {
        wordArray[index] = 'آ';
        _.pullAt(wordArray, (index + 1), (index + 2));
    }

    function checkFinalHamza(index) {
       // aloof
        var previousLetter1 = wordArray[index - 1];
        var previousLetter2 = wordArray[index - 2];

        if (previousLetter1 === 'ا' || previousLetter1 === 'ْْْ') {}
        else {
            switch (previousLetter1) {
                case 'َ': wordArray[index] = 'أ'; break;
                case 'ُ': wordArray[index] = 'ؤ'; break;
                case 'ِ': wordArray[index] = 'ئ'; break;
            }
        }
    }

    function checkFirstLetter() {
        // Check if first letter is hamza
        if (_.contains(indexes, 0)) {
            // Fathah or dammah means hamza on top of alif
            if (wordArray[1] === 'َ' || wordArray[1] === 'ُ') {
                wordArray[0] = 'أ';
            }
            // Kasrah means hamza on bottom of alif
            else {
                wordArray[0] = 'إ';
            }
        }
    }

    // Check regular medial rules
    function checkMedialRegular(index) {
        var previousLetter = wordArray[index - 1];
        var nextLetter = wordArray[index + 1];

        // if it's a sukoon, then look at the next one
        if (previousLetter ===  'ْ') {
            previousLetter = wordArray[index - 2];
        }
        // yaa seat
        if ( (previousLetter === 'ي' || previousLetter === 'ِ') || (nextLetter === 'ي' || nextLetter === 'ِ') ) {
            wordArray[index] = 'ئ';
        }
        // waaw seat
        else if ( (previousLetter === 'ُ' || previousLetter === 'و') || (nextLetter === 'ُ' || nextLetter === 'و') ) {
            wordArray[index] = 'ؤ';
        }
        // alif seat
        else {
            wordArray[index] = 'أ';
        }
    }

    function isMedialAloof(index) {
        var previousLetter1 = wordArray[index - 1];
        var previousLetter2 = wordArray[index - 2];
        var previousLetter3 = wordArray[index - 3];
        var nextLetter = wordArray[index + 1];

        // First case: previous, you have sukoon, waaw, then dammah
        // Second case: alif previous, and fathah next
        // If either case is true, then it's medial aloof
        if ( (previousLetter1 === 'ْ'&& previousLetter2 === 'و' && previousLetter3 === 'ُ') || (previousLetter1 === 'ا' && nextLetter === 'َ') ) {
            return true;
        }
        else {
            return false;
        }
    }

    function getCharIndexes(char, list) {
        var indexList = [];
        for(var i=0; i < list.length;i++) {
            if (list[i] === char) {
                indexList.push(i)
            };
        }
        return indexList;
    }
    return factory;
})


// Method to replace a char in a string by index
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
;var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', person: 'first person', number: 'singular', perfect: ''},
                { id: 2, pronoun: 'أنْتَ', person: 'second person', gender: 'masculine', number: 'singular', perfect: ''},
                { id: 3, pronoun: 'أنْتِ', person: 'second person', gender: 'feminine', number: 'singular', perfect: ''},
                { id: 4, pronoun: 'أنْتُما', person: 'second person', number: 'dual', perfect: ''},
                { id: 5, pronoun: 'هُوَ', person: 'third person', gender: 'masculine', number: 'singular', perfect: ''},
                { id: 6, pronoun: 'هِيَ', person: 'third person', gender: 'feminine', number: 'singular', perfect: ''},
                { id: 7, pronoun: 'هُما', person: 'third person', gender: 'masculine', number: 'dual', perfect: ''},
                { id: 8, pronoun: 'هُما', person: 'third person', gender: 'feminine', number: 'dual', perfect: '' },
                { id: 9, pronoun: 'نَحْنُ', person: 'first person', number: 'plural', perfect: '' },
                { id: 10, pronoun: 'أَنْتُم', person: 'second person', gender: 'masculine', number: 'plural', perfect: '' },
                { id: 11, pronoun: 'أَنْتُنَّ', person: 'second person', gender: 'feminine', number: 'plural', perfect: '' },
                { id: 12, pronoun: 'هُم', person: 'third person', gender: 'masculine', number: 'plural', perfect: '' },
                { id: 13, pronoun: 'هُنَّ', person: 'third person', gender: 'feminine', number: 'plural', perfect: '' }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'],

        endings: ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُمَا', 'َ', 'َتْ', 'َا', 'َتَا', 'ْنَا', 'ْتُمْ', 'ْتُنَّ', 'ُوْا', 'ْنَ'],

        shortVowels: [{vowel: 'َ', name: 'fatha'}, {vowel: 'ُ', name: 'dammah'}, {vowel: 'ِ', name: 'kasrah'}],

        // hash for going from waaw to kasrah, alif to fatha, etc
        longToShort: {'و': 'ُ', 'ي': 'ِ', 'ا': 'َ'},

        verbTypes: [{name: 'assimilated'},
                {name: 'geminate'},
                {name: 'hamzated'},
                {name: 'hollow', type: 'waaw'}, {name: 'hollow', type: 'yaa'}, {name: 'hollow', type: 'alif'},
                {name: 'defective', type: 'waaw'}, {name: 'defective', type: 'yaa (aa-ii)'}, {name: 'defective', type: 'yaa (ya-aa)'},
                {name: 'sound'}]

    }
);var verbApp = angular.module('verbApp');

// The primary service which deals with handling questions, checking answers, etc
verbApp.factory('questionsService', function(alertService) {
    var service = {};

    // Index of current question
    service.questionIndex;

    // List of initial unfiltered conjugations
    service.conjugations = [];

    service.clearInput = function() {
        service.input = {};
    }

    service.resetQuestions = function() {
        service.clearInput();
        service.currentQuestion.isCorrect = null;
        service.questionIndex = 0;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
    }

    service.nextQuestion = function() {
        service.questionIndex += 1;
        if (service.questionIndex >= service.filteredQuestions.length) {
            service.questionIndex = 0;
        }
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
        service.clearInput();
    }

    service.previousQuestion = function() {
        service.questionIndex -= 1;
        if (service.questionIndex < 0) {
            service.questionIndex = service.filteredQuestions.length - 1;
        }
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
        service.clearInput();
    }

    // Reset question set to first question
    service.updateQuestions = function() {
        service.questionIndex = 0;
        service.currentQuestion = service.filteredQuestions[service.questionIndex];
    }

    service.showAnswer = function(question, answer) {
        question.userAnswer = answer;
    }

    service.checkAnswer = function(userAnswer, answer) {
        if (userAnswer === answer) {
            service.currentQuestion.isCorrect = true;
            if (service.questionIndex >= (service.filteredQuestions.length - 1)) {
                service.resetQuestions();
                alertService.set('setCompleted', 'You have completed all the questions in the set!');
            }
        }
        else {
            service.currentQuestion.isCorrect = false;
        }
    }

    return service;
})
;// sound example
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


//defective yaa example 2
var verb = {
    letter1: 'ن',
    letter2: 'س',
    letter3: 'ي',
    type: {
        name: 'defective',
        type: 'yaa (ya-aa)'
    },
    perfectVowel: 'ِ',
    imperfectVowel: 'ُ'
}

// hamzated example
var verb = {
    letter1: 'ء',
    letter2: 'ك',
    letter3: 'ل',
    type: {
        name: 'hamzated'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

// hamzated example
var verb = {
    letter1: 'ق',
    letter2: 'ر',
    letter3: 'ء',
    type: {
        name: 'hamzated'
    },
    perfectVowel: 'َ',
    imperfectVowel: 'ُ'
}

// hamazated word examples

//var myWord = 'هَيْءَة';
//var myWord = 'سَءَلَتْ';
//var myWord = 'مُءَدِّب';
//var myWord = 'ءِسْلَام';
//var myWord = 'مُرُوْءَة';
//var myWord = 'رَءْس'
var myWord = 'مَءَاذِن';
;var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.constant('verbs', [

    // Sound
    {
        letter1: 'ك',
        letter2: 'ت',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to write'
    },
    {
        letter1: 'ص',
        letter2: 'ع',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ُ',
        imperfectVowel: 'ُ',
        definition: 'to be difficult'
    },
    {
        letter1: 'ش',
        letter2: 'ر',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'َ',
        definition: 'to drink'
    },
    // Geminate
    {
        letter1: 'د',
        letter2: 'ل',
        letter3: 'ل',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to indicate'
    },
    // Defective waaw example
    {
        letter1: 'د',
        letter2: 'ع',
        letter3: 'و',
        type: {
            name: 'defective',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to call'
    }


])
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

        .state('main.conjugation', {
            url: '/conjugation',
            templateUrl: '/app/components/verb_app/templates/conjugation.html',
            controller: 'conjugatorCtrl'
        })

})
;var arabicSite = angular.module('arabicSite');

arabicSite.directive('appAlert', function(alertService) {
    return {
        restrict: 'E',
        templateUrl: '/app/shared/directives/app_alert/app_alert.html',
        scope: {},
        link: function (scope, elem, attrs) {
            scope.alertService = alertService;

            scope.hideModal = function() {
                //scope.alertObj.visible = false;
                scope.alertService.visible = false;
            }
        }

    }
});var arabicSite = angular.module('arabicSite');

arabicSite.factory('alertService', function() {
    var service = {};

    // The message to be displayed
    service.message;

    // The alert type, e.g. noMatches, setComplete
    service.type

    service.visible = false;

    service.set = function(type, message) {
        service.message = message;
        service.type = type;
        service.visible = true;
    }

    service.clear = function() {
        service.message = null;
        service.alertType = null;
        service.visible = false;
    }

    return service;
})