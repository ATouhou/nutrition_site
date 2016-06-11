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

        .state('main.home', {
            url: '^/home',
            templateUrl: '/components/root/templates/home.html',
            controller: 'homeCtrl'
        })
})
