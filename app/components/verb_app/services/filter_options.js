var verbApp = angular.module('verbApp');

verbApp.factory('filterOptions', function(helperData) {
    var filterOptions = {};

    filterOptions.types = [{name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]
    filterOptions.pronouns = angular.copy(helperData.pronounList);
    filterOptions.forms = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}]

    filterOptions.allTypes = true;
    filterOptions.allPronouns = true;

    filterOptions.toggleAll = function(type, value) {
        _.forEach(this[type], function(item) {
            item.selected = value;
        })
    }

    return filterOptions;
})

