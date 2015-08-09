var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', name: 'first person singular', perfect: ''},
                { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', perfect: ''},
                { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', perfect: ''},
                { id: 4, pronoun: 'أنْتُما', name: 'second person dual', perfect: ''},
                { id: 5, pronoun: 'هُوَ', name: 'third person masculine singular', perfect: ''},
                { id: 6, pronoun: 'هِيَ', name: 'third person feminine singular', perfect: ''},
                { id: 7, pronoun: 'هُما', name: 'third person masculine dual', perfect: ''},
                { id: 8, pronoun: 'هُما', name: 'third person feminine dual', perfect: '' },
                { id: 9, pronoun: 'نَحْنُ', name: 'first person plural', perfect: '' },
                { id: 10, pronoun: 'أَنْتُم', name: 'second person masculine plural', perfect: '' },
                { id: 11, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', perfect: '' },
                { id: 12, pronoun: 'هُم', name: 'third person masculine plural', perfect: '' },
                { id: 13, pronoun: 'هُنَّ', name: 'third person feminine plural', perfect: '' }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],

        endings: ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُمَا', 'َ', 'َتْ', 'َا', 'َتَا', 'ْنَا', 'ْتُمْ', 'ْتُنَّ', 'ُوْا', 'ْنَ'],

        shortVowels: [{vowel: 'َ', name: 'fatha'}, {vowel: 'ُ', name: 'dammah'}, {vowel: 'ِ', name: 'kasrah'}],

        // hash for going from waaw to kasrah, alif to fatha, etc
        longToShort: {'و': 'ُ', 'ي': 'ِ', 'ا': 'َ'},

        types: [{name: 'sound'}, {name: 'geminate'}, {name: 'hollow', type: 'waaw'},
                {name: 'hollow', type: 'yaa'}, {name: 'hollow', type: 'alif'},
                {name: 'assimilated'},
                {name: 'defective', type: 'waaw'}, {name: 'defective', type: 'yaa (aa-ii)'}, {name: 'defective', type: 'yaa (ya-aa)'}]
    }
)