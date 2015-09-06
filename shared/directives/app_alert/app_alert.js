var arabicSite = angular.module('arabicSite');

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
})