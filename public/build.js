var app = angular.module('arabicSite', ['ui.router', 'ngMaterial']);

app.run(function ($rootScope, $state) {
    $rootScope._ = window._;

    $rootScope.$state = $state;
});

app.config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/about');
})

;var app = angular.module('arabicSite');

app.controller('homeCtrl', function($scope) {

    console.log('Inside the home controller!');

})


;var app = angular.module('arabicSite');

app.controller('rootCtrl', function($scope) {
    $scope._ = _;


    $scope.submitForm = function() {
        alert('form submitted!');
    }

})

;var app = angular.module('arabicSite');

app.config(function($stateProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/home");

    // Now set up the states
    $stateProvider
        // This is the root state. Every other state is a child of this state (directly or indirectly).
        .state('main', {
            url: '/',
            templateUrl: '/components/root/templates/app_index.html',
            controller: 'rootCtrl'
        })

        .state('main.home', {
            url: '^/home',
            templateUrl: '/components/root/templates/home.html'
        })

        .state('main.about', {
            url: '^/about',
            templateUrl: '/components/root/templates/about.html'
        })

        .state('main.appointment', {
            url: '^/appointment',
            templateUrl: '/components/root/templates/appointment.html'
        })
})
;var arabicSite = angular.module('arabicSite');

arabicSite.directive('appAlert', function(alertService) {
    return {
        restrict: 'E',
        templateUrl: '/shared/directives_alert_alert.html',
        scope: {},
        link: function (scope, elem, attrs) {
            scope.alertService = alertService;

            scope.hideModal = function() {
                //scope.alertObj.visible = false;
                scope.alertService.visible = false;
            }
        }

    }
});var arabicSite = angular.module('arabicSite');

arabicSite.factory('alertService', function() {
    var service = {};

    // The message to be displayed
    service.message;

    // The alert type, e.g. noMatches, setComplete
    service.type

    service.visible = false;

    service.set = function(type, message) {
        service.message = message;
        service.type = type;
        service.visible = true;
    }

    service.clear = function() {
        service.message = null;
        service.alertType = null;
        service.visible = false;
    }

    return service;
})