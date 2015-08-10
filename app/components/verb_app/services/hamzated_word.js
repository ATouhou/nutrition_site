var verbApp = angular.module('verbApp');

// Take any word with hamza and put it on the its correct seat
verbApp.factory('hamzatedWord', function() {
    var factory = {};

    factory.getWord = function(word) {
        // Check if first letter is hamza
        if (word[0] === 'ء') {
            // fathah or dammah means hamza on top of alif
            if (word[1] === 'َ' || word[1] === 'ُ') {
                word = word.replaceAt(0, 'أ');
            }
            // kasrah means fathah on bottom of alif
            else {
                word = word.replaceAt(0, 'إ');
            }
        }

        return word;
    }

    return factory;
})


// if first letter, then written on top if vowel is fathah or dammah. written on bottom if short vowel is kasrah
//






// Method to replace a char in a string by index
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
