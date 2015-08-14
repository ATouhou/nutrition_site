var verbApp = angular.module('verbApp');

verbApp.value('menuOptions', [
    {title: 'type', options: [{name: 'all'}, {name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]},
    {title: 'person', options: [{name: 'all'}, {name: 'first'}, {name: 'second'}, {name: 'third'}]},
    {title: 'gender', options: [{name: 'all'}, {name: 'masculine'}, {name: 'feminine'}]},
    {title: 'number', options: [{name: 'all'}, {name: 'singular'}, {name: 'dual'}, {name: 'plural'}]},

    //{title: 'form', options: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}, {name: 8}, {name: 9}, {name: 10}]}
])

