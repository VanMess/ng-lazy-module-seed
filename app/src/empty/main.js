/*
 *	empty 模块主入口
 */
define([
    'ng',
    './_ctrl.js'
], function(ng, controllers) {
    'use strict';

    var MODULE_NAME = 'empty',
        module = ng.$$init(MODULE_NAME, {
            controllers: controllers
        });

    return module;
});
