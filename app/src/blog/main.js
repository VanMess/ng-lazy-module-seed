/*
 *	博客 模块主入口
 */
define([
    'ng',
    './_ctrl.js',
    './store/main.js',
    'ngAutoValidate'
], function(ng, controllers, stores) {
    'use strict';

    var MODULE_NAME = 'blog',
        module = ng.$$init(MODULE_NAME, {
            controllers: controllers,
            stores: stores,
            deps: ['jcs-autoValidate']
        });

    return module;
});
