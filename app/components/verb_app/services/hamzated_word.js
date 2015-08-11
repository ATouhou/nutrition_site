var verbApp = angular.module('verbApp');

// Take any word with hamza and put it on the its correct seat
verbApp.factory('hamzatedWord', function() {
    var factory = {};

    factory.getWord = function(word) {
        // Get an array of indexes where hamza is present [0,3] for example
        var wordArray = word.split('');
        var indexes = getCharIndexes('ء', wordArray);

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

        // Check if there hamzas beyond the first letter
        var moreHamzas = _.some(indexes, function(index) {
            return index > 0;
        })

        if (moreHamzas) {
            _.forEach(indexes, function(index) {
                var leftVowel = wordArray[index - 1];
                var rightVowel = wordArray[index + 1];

                if (isMedialAloof(wordArray, index)) {}
                else {
                    // Check general rules
                    // if it's a sukoon, then look at the next one
                    if (leftVowel ===  'ْ') {
                        leftVowel = wordArray[index - 2];
                    }

                    // compare leftVowel and rightVowel
                    if ( (leftVowel === 'ي' || leftVowel === 'ِ') || (rightVowel === 'ي' || rightVowel === 'ِ') ) {
                        wordArray[index] = 'ئ';
                    }
                    else if ( (leftVowel === 'ُ' || leftVowel === 'و') || (rightVowel === 'ُ' || rightVowel === 'و') ) {
                        wordArray[index] = 'ؤ';
                    }
                    else {
                        wordArray[index] = 'أ';
                    }
                }
            })
        }

        return wordArray.join('');
    }

    function isMedialAloof(wordArray, index) {
        var leftLetter1 = wordArray[index - 1];
        var leftLetter2 = wordArray[index - 2];
        var leftLetter3 = wordArray[index - 3];
        var rightLetter = wordArray[index + 1];

        // First case: before, you have sukoon, waaw, then dammah
        // Second case: alif before, and fathah after
        // If either case is true, then it's medial aloof
        if ( (leftLetter1 === 'ْ'&& leftLetter2 === 'و' && leftLetter3 === 'ُ') || (leftLetter1 === 'ا' && rightLetter === 'َ') ) {
            return true;
        }
        else {
            return false;
        }
    }

    function getCharIndexes(char, list) {
        var indexes = [];
        for(var i=0; i < list.length;i++) {
            if (list[i] === char) {
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
