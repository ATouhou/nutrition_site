var app = angular.module('arabicSite');

app.config(function($stateProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/home");

    // Now set up the states
    $stateProvider
        // This is the root state. Every other state is a child of this state (directly or indirectly).
        .state('main', {
            url: '/',
            templateUrl: '/components/root/templates/index.html',
            controller: 'rootCtrl'
        })

        .state('main.conjugationPractice', {
            url: '^/conjugation_practice',
            templateUrl: '/components/verb_app/templates/index.html',
            controller: 'verbAppCtrl'
        })

        .state('main.typingTutor', {
            url: '^/typing_tutor',
            templateUrl: '/components/typing_tutor/typing_tutor.html',
            controller: 'typingTutorCtrl'
        })

        .state('main.exercises', {
            url: '^/thackston_book_exercises',
            templateUrl: '/components/verb_app/templates/exercises.html',
            controller: 'exercisesCtrl'
        })

        .state('main.about', {
            url: '^/about',
            templateUrl: '/static/about.html'
        })

        .state('main.conjugation', {
            url: '^/conjugation',
            templateUrl: '/components/verb_app/templates/conjugation.html',
            controller: 'conjugatorCtrl'
        })





})
