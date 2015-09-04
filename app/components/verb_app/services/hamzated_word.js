var verbApp = angular.module('verbApp');

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

