var app = angular.module('arabicSite', ['ui.router', 'verbApp']);

app.run(function ($rootScope) {
    $rootScope._ = window._;
});

;var verbApp = angular.module('verbApp', [])

console.log('***** verb app module ********');;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {


})
;var verbApp = angular.module('verbApp');

verbApp.controller('verbAppCtrl', function($scope) {


})
;;app.config(function($stateProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/home");

    // Now set up the states
    $stateProvider
        // This is the root state. Every other state is a child of this state (directly or indirectly).
        .state('main', {
            url: '/main',
            templateUrl: '/app/components/root/templates/index.html',
            controller: 'rootCtrl'
        })

        .state('main.verbApp', {
            url: '/verb_app',
            templateUrl: '/app/components/verb_app/templates/index.html',
            controller: 'verbAppCtrl'
        })

})
