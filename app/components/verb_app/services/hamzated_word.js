var verbApp = angular.module('verbApp');

// Take any word with hamza and put it on the its correct seat
verbApp.factory('hamzatedWord', function() {
    var factory = {};

    factory.getWord = function(word) {


    }

    return factory;
})


// if first letter, then written on top if vowel is fathah or dammah. written on bottom if short vowel is kasrah
//
