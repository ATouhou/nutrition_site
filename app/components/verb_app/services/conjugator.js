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


    // Grab and copy pronounList and add endings for each verb
    function getList() {
        var list = angular.copy(helperData.pronounList);
        var endings = ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُما', 'ْتُما', 'َ', 'تْ', 'ا', 'ا', 'ْنا', 'تُم', 'ْتُنَّ', 'وا', 'ْنَ'];
        _.forEach(endings, function(ending, index) {
            list[index].endings.perfect = c.verb.letter3 + ending;
        })
        return list;
    }
    return c;
})

