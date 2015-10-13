/*
 *   模块入口处理
 */
define(['ng'], function(ng) {
    'use strict';
    var APP_NAME = 'app',
        defaults = {
            filters: {},
            factories: {},
            controllers: {},
            directives: {},
            stores: {},
            constants: {},
            deps: []
        };

    return _init;

    function _init(name, config, withoutPrefix) {
        config = ng.extend({}, defaults, config);
        var module = ng.module(APP_NAME + '.' + name, config.deps),
            modulePrefix = withoutPrefix ? '' : name + '.';

        // 自定义过滤器
        for (var i in config.filters) {
            module.filter(modulePrefix + i, config.filters[i]);
        }

        // 自定义工厂
        for (var i in config.factories) {
            module.factory(modulePrefix + i, config.factories[i]);
        }

        // 注册控制器
        for (var i in config.controllers) {
            module.controller(modulePrefix + i, config.controllers[i]);
        }

        for (var i in config.directives) {
            module.directive(modulePrefix + i, config.directives[i]);
        }

        // 注册 resource 服务
        for (var i in config.stores) {
            module.factory(modulePrefix + i, config.stores[i]);
        }

        // 设置系统常量
        for (var i in config.constants) {
            module.constant(modulePrefix + i, config.constants[i]);
        }

        return module;
    }
});
