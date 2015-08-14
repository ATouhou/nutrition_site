var verbApp = angular.module('verbApp');

verbApp.value('menuOptions', [
    {title: 'type', options: [{name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]},
    {title: 'person', options: [{name: 'first person'}, {name: 'second person'}, {name: 'third person'}]},
    {title: 'gender', options: [{name: 'masculine'}, {name: 'feminine'}]},
    {title: 'number', options: [{name: 'singular'}, {name: 'dual'}, {name: 'plural'}]},

    //{title: 'form', options: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}]}
])

