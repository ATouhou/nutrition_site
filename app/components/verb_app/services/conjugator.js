var verbApp = angular.module('verbApp');

verbApp.factory('conjugator', function(helperData) {
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

    c.setVerb = function(verb) {
        c.verb = verb;
        c.list = getList();
    }

    c.getVerb = function(pronoun) {
        // focus on perfect verbs for now
        var base;

        // sound
        if (c.verb.type.name === 'sound') {
            base = getSoundBase(pronoun);
        }

        // hollow
        if (c.verb.type.name === 'hollow') {
            base = getHollowBase(pronoun);
        }

        if (c.verb.type.name === 'geminate') {
            base = getGeminateBase(pronoun);
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

    // Grab and copy pronounList and add endings for each verb
    function getList() {
        var list = angular.copy(helperData.pronounList);

        var endings = ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُما', 'َ', 'َتْ', 'ا', 'َتا', 'ْنا', 'ْتُمْ', 'ْتُنَّ', 'وا', 'ْنَ'];

        _.forEach(endings, function(ending, index) {
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

