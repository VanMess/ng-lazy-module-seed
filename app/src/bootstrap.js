define(['ng', './core/main'], function(ng, core) {
    'use strict';
    var app = ng.module('app', [
        'ui.router',
        core,
        'ngAnimate',
        'ngResource',
        'oc.lazyLoad',
        'ngSanitize'
    ]);

    return _bootstrap;

    function _bootstrap(systemConfig) {
        app.constant('config', systemConfig);
        ng.bootstrap(window.document, ['app'], {
            strictDi: true
        });
    }
});
