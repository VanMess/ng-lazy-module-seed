/*
 *	博客 模块主入口
 */
define([
    'ng',
    './_ctrl.js',
    './store/main.js'
], function(ng, controllers, stores) {
    'use strict';

    var MODULE_NAME = 'blog',
        module = ng.$$init(MODULE_NAME, {
            controllers: controllers,
            stores: stores
        });

    return module;
});
