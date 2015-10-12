require.config({
    baseUrl: '/src',
    paths: {
        'config': '../.config/cfg.dev',
        // core 依赖
        'ng': './ng',
        'angular': '../libs/angular/angular',
        'ngResource': '../libs/angular-resource/angular-resource',
        'ngAnimate': '../libs/angular-animate/angular-animate',
        'ngSanitize': '../libs/angular-sanitize/angular-sanitize',
        'ngLoadingBar': '../libs/angular-loading-bar/build/loading-bar',
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

require(['config', './bootstrap'], function(systemConfig, bootstrap) {
    bootstrap(systemConfig);
});
