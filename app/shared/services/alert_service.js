var arabicSite = angular.module('arabicSite');

arabicSite.factory('alertService', function() {
    var service = {};

    service.message;
    service.visible = false;

    service.show = function(message) {
        service.message = message;
        service.visible = true;
    }

    service.clear = function() {
        service.message = null;
        service.visible = false;
    }

    return service;
})