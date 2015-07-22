var verbApp = angular.module('verbApp');

verbApp.value('pronounList', [
        { id: 1, pronoun: 'أنا', name: 'first person singular', endings: {} },
        { id: 2, pronoun: 'أنْتَ', name: 'second person masculine singular', endings: {} },
        { id: 3, pronoun: 'أنْتِ', name: 'second person feminine singular', endings: {} },
        { id: 4, pronoun: 'أنْتُما', name: 'second person masculine dual', endings: {} },
        { id: 5, pronoun: 'أَنْتُما', name: 'second person feminine dual', endings: {} },
        { id: 6, pronoun: 'هُوَ', name: 'third person masculine singular', endings: {} },
        { id: 7, pronoun: 'هِيَ', name: 'third person feminine singular', endings: {} },
        { id: 8, pronoun: 'هُما', name: 'third person masculine dual', endings: {} },
        { id: 9, pronoun: 'هُما', name: 'third person feminine dual', endings: {} },
        { id: 10, pronoun: 'نَحْنُ', name: 'first person plural', endings: {} },
        { id: 11, pronoun: 'أَنْتُم', name: 'second person masculine plural', endings: {} },
        { id: 12, pronoun: 'أَنْتُنَّ', name: 'second person feminine plural', endings: {} },
        { id: 13, pronoun: 'هُم', name: 'third person masculine plural', endings: {} },
        { id: 14, pronoun: 'هُنَّ', name: 'third person feminine plural', endings: {} }
    ]
)