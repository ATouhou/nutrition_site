var verbApp = angular.module('verbApp');

// General verb related helper data
verbApp.constant('verbs', [

    // Sound
    {
        letter1: 'ك',
        letter2: 'ت',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to write'
    },
    {
        letter1: 'ص',
        letter2: 'ع',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ُ',
        imperfectVowel: 'ُ',
        definition: 'to be difficult'
    },
    {
        letter1: 'ش',
        letter2: 'ر',
        letter3: 'ب',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'َ',
        definition: 'to drink'
    },
    {
        letter1: 'ع',
        letter2: 'م',
        letter3: 'ل',
        type: {
            name: 'sound'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'َ',
        definition: 'to work'
    },
    {
        letter1: 'د',
        letter2: 'ر',
        letter3: 'س',
        type: {
            name: 'sound'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to study'
    },

    // Geminate
    {
        letter1: 'د',
        letter2: 'ل',
        letter3: 'ل',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to indicate'
    },
    {
        letter1: 'ظ',
        letter2: 'ن',
        letter3: 'ن',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to think, believe'
    },
    {
        letter1: 'ت',
        letter2: 'م',
        letter3: 'م',
        type: {
            name: 'geminate'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to be complete'
    },
    // todo: Rember write logic to handle these cases
    //{
    //    letter1: 'و',
    //    letter2: 'د',
    //    letter3: 'د',
    //    type: {
    //        name: 'geminate'
    //    },
    //    perfectVowel: 'َ',
    //    imperfectVowel: 'َ',
    //    definition: 'to want, to like'
    //},
    //{
    //    letter1: 'ظ',
    //    letter2: 'ل',
    //    letter3: 'ل',
    //    type: {
    //        name: 'geminate'
    //    },
    //    perfectVowel: 'َ',
    //    imperfectVowel: 'َ',
    //    definition: 'to continue, remain'
    //},


    // Defective waaw
    {
        letter1: 'د',
        letter2: 'ع',
        letter3: 'و',
        type: {
            name: 'defective',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to call'
    },
    {
        letter1: 'ن',
        letter2: 'ج',
        letter3: 'و',
        type: {
            name: 'defective',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to survive'
    },
    {
        letter1: 'م',
        letter2: 'ش',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to walk'
    },
    {
        letter1: 'ر',
        letter2: 'م',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to throw'
    },
    {
        letter1: 'ر',
        letter2: 'و',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (aa-ii)'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to narrate, relate'
    },
    {
        letter1: 'ن',
        letter2: 'س',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (ya-aa)'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'ُ',
        definition: 'to forget'
    },
    {
        letter1: 'ب',
        letter2: 'ق',
        letter3: 'ي',
        type: {
            name: 'defective',
            type: 'yaa (ya-aa)'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'ُ',
        definition: 'to stay, remain'
    },
    {
        letter1: 'ق',
        letter2: 'و',
        letter3: 'ل',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to say'
    },
    {
        letter1: 'ز',
        letter2: 'و',
        letter3: 'ر',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to visit'
    },
    {
        letter1: 'ل',
        letter2: 'و',
        letter3: 'م',
        type: {
            name: 'hollow',
            type: 'waaw'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to blame'
    },
    {
        letter1: 'ع',
        letter2: 'ي',
        letter3: 'ش',
        type: {
            name: 'hollow',
            type: 'yaa'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to live'
    },
    {
        letter1: 'ب',
        letter2: 'ي',
        letter3: 'ع',
        type: {
            name: 'hollow',
            type: 'yaa'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to sell'
    },
    {
        letter1: 'خ',
        letter2: 'و',
        letter3: 'ف',
        type: {
            name: 'hollow',
            type: 'alif'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to fear'
    },
    {
        letter1: 'ن',
        letter2: 'و',
        letter3: 'م',
        type: {
            name: 'hollow',
            type: 'alif'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to sleep'
    },
    // Assimilated
    {
        letter1: 'و',
        letter2: 'ص',
        letter3: 'ل',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ِ',
        definition: 'to arrive'
    },
    {
        letter1: 'و',
        letter2: 'ض',
        letter3: 'ع',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to put, place'
    },
    {
        letter1: 'ي',
        letter2: 'س',
        letter3: 'ر',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'ِ',
        imperfectVowel: 'ِ',
        definition: 'to be easy'
    },
    {
        letter1: 'و',
        letter2: 'س',
        letter3: 'ع',
        type: {
            name: 'assimilated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to be wide'
    },
    // Hamzated
    {
        letter1: 'ق',
        letter2: 'ر',
        letter3: 'ء',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to read'
    },
    {
        letter1: 'س',
        letter2: 'ء',
        letter3: 'ل',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'َ',
        definition: 'to ask'
    },
    {
        letter1: 'أ',
        letter2: 'ك',
        letter3: 'ل',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to eat'
    },
    {
        letter1: 'ب',
        letter2: 'د',
        letter3: 'ء',
        type: {
            name: 'hamzated'
        },
        perfectVowel: 'َ',
        imperfectVowel: 'ُ',
        definition: 'to begin'
    },




])
