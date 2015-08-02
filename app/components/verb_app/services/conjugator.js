var verbApp = angular.module('verbApp');

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
        switch (c.verb.type.name) {
            case 'sound': return getSoundList();
            case 'geminate': return getGeminateList();
            case 'hollow': return getHollowList();
        }
    }

    function getDefectiveList(pronoun) {
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

    function getHollowList(pronoun) {
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

    function getGeminateList() {
        var list = angular.copy(helperData.pronounList);
        _.forEach(list, function(pronoun, index) {
            pronoun.perfect = getGeminateVerb(pronoun.id);
        })
        return list
    }

    function getSoundList() {
        var list = angular.copy(helperData.pronounList);
        _.forEach(list, function(pronoun) {
            pronoun.perfect = getSoundVerb(pronoun.id);
        })
        return list;
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

