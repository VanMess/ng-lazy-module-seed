/*
 *	core 模块主入口
 */
define([
    'ng',
    './module.init',
    './route',
    './_ctrl'
], function(ng, initModule, routes, controllers) {
    'use strict';
    ng.$$init = initModule;

    var MODULE_NAME = 'core',
        module = ng.$$init(MODULE_NAME, {
            controllers: controllers
        }, true);

    module
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/');
                ng.forEach(routes, function(route, key) {
                    $stateProvider.state(key, route);
                });

                $locationProvider.html5Mode(false);
            }
        ])
        .run(['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);

    return module.name;
});
