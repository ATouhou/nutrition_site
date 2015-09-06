var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.value('helperData', {
        pronounList: [
                { id: 1, pronoun: 'أنا', person: 'first person', number: 'singular', perfect: ''},
                { id: 2, pronoun: 'أنْتَ', person: 'second person', gender: 'masculine', number: 'singular', perfect: ''},
                { id: 3, pronoun: 'أنْتِ', person: 'second person', gender: 'feminine', number: 'singular', perfect: ''},
                { id: 4, pronoun: 'أنْتُما', person: 'second person', number: 'dual', perfect: ''},
                { id: 5, pronoun: 'هُوَ', person: 'third person', gender: 'masculine', number: 'singular', perfect: ''},
                { id: 6, pronoun: 'هِيَ', person: 'third person', gender: 'feminine', number: 'singular', perfect: ''},
                { id: 7, pronoun: 'هُما', person: 'third person', gender: 'masculine', number: 'dual', perfect: ''},
                { id: 8, pronoun: 'هُما', person: 'third person', gender: 'feminine', number: 'dual', perfect: '' },
                { id: 9, pronoun: 'نَحْنُ', person: 'first person', number: 'plural', perfect: '' },
                { id: 10, pronoun: 'أَنْتُم', person: 'second person', gender: 'masculine', number: 'plural', perfect: '' },
                { id: 11, pronoun: 'أَنْتُنَّ', person: 'second person', gender: 'feminine', number: 'plural', perfect: '' },
                { id: 12, pronoun: 'هُم', person: 'third person', gender: 'masculine', number: 'plural', perfect: '' },
                { id: 13, pronoun: 'هُنَّ', person: 'third person', gender: 'feminine', number: 'plural', perfect: '' }
        ],
        letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ء'],

        endings: ['ْتُ', 'ْتَ', 'ْتِ', 'ْتُمَا', 'َ', 'َتْ', 'َا', 'َتَا', 'ْنَا', 'ْتُمْ', 'ْتُنَّ', 'ُوْا', 'ْنَ'],

        shortVowels: [{vowel: 'َ', name: 'fatha'}, {vowel: 'ُ', name: 'dammah'}, {vowel: 'ِ', name: 'kasrah'}],

        // hash for going from waaw to kasrah, alif to fatha, etc
        longToShort: {'و': 'ُ', 'ي': 'ِ', 'ا': 'َ'},

        verbTypes: [{name: 'assimilated'},
                {name: 'geminate'},
                {name: 'hamzated'},
                {name: 'hollow', type: 'waaw'}, {name: 'hollow', type: 'yaa'}, {name: 'hollow', type: 'alif'},
                {name: 'defective', type: 'waaw'}, {name: 'defective', type: 'yaa (aa-ii)'}, {name: 'defective', type: 'yaa (ya-aa)'},
                {name: 'sound'}]

    }
)