var verbApp = angular.module('verbApp');

verbApp.value('menuOptions', [
    {title: 'type', options: [{name: 'all'}, {name: 'assimilated'}, {name: 'geminate'}, {name: 'hamzated'}, {name: 'hollow'}, {name: 'defective'}, {name: 'sound'}]},
    {title: 'person', options: [{name: 'all'}, {name: 'first'}, {name: 'second'}, {name: 'third'}]},
    {title: 'gender', options: [{name: 'all'}, {name: 'masculine'}, {name: 'feminine'}]},
    {title: 'number', options: [{name: 'all'}, {name: 'singular'}, {name: 'dual'}, {name: 'plural'}]},
])

