var verbApp = angular.module('verbApp');

// Take any word with hamza and put it on the its correct seat
verbApp.factory('hamzatedWord', function() {
    var factory = {};

    factory.getWord = function(word) {
        // Get an array of indexes where hamza is present [0,3] for example
        var indexes = getCharIndexes('ء', word);

        // Check if first letter is hamza
        if (_.contains(indexes, 0)) {
            // fathah or dammah means hamza on top of alif
            if (word[1] === 'َ' || word[1] === 'ُ') {
                word = word.replaceAt(0, 'أ');
            }
            // kasrah means hamza on bottom of alif
            else {
                word = word.replaceAt(0, 'إ');
            }
        }

        var moreHamzas = _.some(indexes, function(index) {
            return index > 0;
        })

        var wordArray = word.split('');

        if (moreHamzas) {
            _.forEach(indexes, function(index) {
                var leftVowel = wordArray[index - 1];
                var rightVowel = wordArray[index + 1];

                // if it's a sukoon, then look at the next one
                if (leftVowel ===  'ْ') {
                    leftVowel = wordArray[index - 2];
                }

                // compare leftVowel and rightVowel
                if ( (leftVowel === 'ي' || leftVowel === 'ِ') || (rightVowel === 'ي' || rightVowel === 'ِ') ) {
                    word = word.replaceAt(index, 'ئ');

                }
                else if ( (leftVowel === 'ُ' || leftVowel === 'و') || (rightVowel === 'ُ' || rightVowel === 'و') ) {
                    word = word.replaceAt(index, 'ؤ');

                }
                else {
                    word = word.replaceAt(index, 'أ');
                }
            })
        }

        return word;
    }


    function getCharIndexes(char, str) {
        var indexes = [];
        for(var i=0; i < str.length;i++) {
            if (str[i] === char) {
                indexes.push(i)
            };
        }
        return indexes;
    }

    return factory;
})


// Method to replace a char in a string by index
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
