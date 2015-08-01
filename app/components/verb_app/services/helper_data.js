var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', name: 'first person singular', endings: {} },
                { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', endings: {} },
                { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', endings: {} },
                { id: 4, pronoun: 'أنْتُما', name: 'second person dual', endings: {} },
                { id: 5, pronoun: 'هُوَ', name: 'third person masculine singular', endings: {} },
                { id: 6, pronoun: 'هِيَ', name: 'third person feminine singular', endings: {} },
                { id: 7, pronoun: 'هُما', name: 'third person masculine dual', endings: {} },
                { id: 8, pronoun: 'هُما', name: 'third person feminine dual', endings: {} },
                { id: 9, pronoun: 'نَحْنُ', name: 'first person plural', endings: {} },
                { id: 10, pronoun: 'أَنْتُم', name: 'second person masculine plural', endings: {} },
                { id: 11, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', endings: {} },
                { id: 12, pronoun: 'هُم', name: 'third person masculine plural', endings: {} },
                { id: 13, pronoun: 'هُنَّ', name: 'third person feminine plural', endings: {} }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],

        shortVowels: [{vowel: 'َ', name: 'fatha'}, {vowel: 'ُ', name: 'dammah'}, {vowel: 'ِ', name: 'kasrah'}]
    }
)