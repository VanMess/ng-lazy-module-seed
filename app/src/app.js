!(function(require) {
    'use strict';
    require.config({
        baseUrl: '/src',
        paths: {
            // core 依赖
            'ng': './ng',
            'angular': '../libs/angular/angular',
            'ngAutoValidate': '/libs/angular-auto-validate/dist/jcs-auto-validate',
            'ngResource': '../libs/angular-resource/angular-resource',
            'ngAnimate': '../libs/angular-animate/angular-animate',
            'ngSanitize': '../libs/angular-sanitize/angular-sanitize',
            'uiRouter': '../libs/angular-ui-router/release/angular-ui-router',
            'ocLazyLoad': '../libs/ocLazyLoad/dist/ocLazyLoad.require'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'uiRouter': {
                deps: ['angular'],
                exports: 'uiRouter'
            },
            'ngResource': {
                deps: ['angular'],
                exports: 'ngResource'
            },
            'ngAutoValidate': {
                deps: ['angular'],
                exports: 'ngAutoValidate'
            },
            'ngAnimate': {
                deps: ['angular'],
                exports: 'ngAnimate'
            },
            'ngSanitize': {
                deps: ['angular'],
                exports: 'ngSanitize'
            },
            'ocLazyLoad': {
                deps: ['angular'],
                exports: 'ocLazyLoad'
            }
        }
    });

    require(['./config/cfg.dev', './bootstrap'], function(systemConfig, bootstrap) {
        bootstrap(systemConfig);
    });
})(window.requirejs);
