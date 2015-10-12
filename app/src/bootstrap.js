define(['ng'], function(ng) {
    var app = ng.module('app', [
        'ui.router',
        coreModule,
        'ngAnimate',
        'ngResource',
        'oc.lazyLoad',
        'ngSanitize'
    ]);

    return _bootstrap;

    function _bootstrap(systemConfig) {
        app.contant('config', systemConfig);
        ng.bootstrap(['app']);
    }
});
