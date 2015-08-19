var verbApp = angular.module('verbApp');

verbApp.factory('filterOptions', function(helperData) {
    var menuOptions = {};

    menuOptions.types = [{name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]

    menuOptions.pronounList = angular.copy(helperData.pronounList);

    menuOptions.forms = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}]

    return menuOptions;
})

