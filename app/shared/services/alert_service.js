var arabicSite = angular.module('arabicSite');

arabicSite.factory('alertService', function() {
    var service = {};

    service.message;
    service.visible = false;

    service.show = function(message) {
        service.message = message;
        service.visible = true;
    }

    return service;
})