var verbApp = angular.module('verbApp');


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

