var app = angular.module('verbApp');

// General verb related helper data
app.factory('thackstonExercises', function() {

    var data = {};

    data.exercises =   [
        {
            question: 'قال له إني آتيك بما أمرتني به قبل أن تقوم من مقامك',
            answer: 'قالَ لَهُ إنِّي آتِيكَ بِما أَمَرْتْني بِهِ قَبْلَ أَنْ تُقُومَ مِنْ مَقامِكَ',
            chapter: 18
        },
        {
            question: 'السلام عليكم يا أخي',
            answer: 'السَلامُ عَلَيْكُمْ يا أَخِي',
            chapter: 18
        },
        {
            question: 'كن في الدنيا كأنك غريب أو عابر سبيل',
            answer: 'كُنْ في الدُنْيا كَأنَّكَ غَريب أَوْ عابِر سَبيل',
            chapter: 19
        }
    ]

    data.chapters = getChapters();

    function getChapters() {
        var nums = _.range(18,41);
        return _.map(nums, function(num) {
            return {name: num};
        })
    }

    return data;
})
