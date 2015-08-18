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
    // Defective waaw example
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
    }


])
