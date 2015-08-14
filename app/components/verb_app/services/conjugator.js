var verbApp = angular.module('verbApp');

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
        c.options = options;
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
