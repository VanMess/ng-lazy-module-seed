var util = require('util'),
    _ = require('underscore'),
    defaults = require('./_r.config.json');

var replaceJsSubfix = function(moduleName, path, content) {
        var _ = {
                isFunction: function(obj) {
                    return typeof obj == 'function' || false;
                },
                isString: function(obj) {
                    return typeof obj === 'string' || false;
                },
                isArray: function(obj) {
                    return obj instanceof Array;
                },
                isObject: function(obj) {
                    var type = typeof obj;
                    return type === 'function' || type === 'object' && !!obj;
                }
            },
            SUBFIX_PARTTERN = /\.js$/ig,
            SRC_PATH_PARTTERN = /\/company[\/\.]*\/src\//g;

        if (!SRC_PATH_PARTTERN.test(path)) return content;

        var define = function(deps, func) {
            var result = ['define('];

            if (_.isFunction(deps)) {
                func = deps;
            } else {
                if (_.isString(deps)) {
                    deps = [deps];
                }
                if (_.isArray(deps)) {
                    var deps_clear = [];
                    for (var i = 0, l = deps.length; i < l; i++) {
                        deps_clear.push(deps[i].replace(SUBFIX_PARTTERN, ''));
                    }
                    result.push(JSON.stringify(deps_clear) + ',');
                } else if (_.isObject(deps)) {
                    func = deps;
                } else {
                    throw new Error('undefine parttern:' + content);
                }
            }

            result.push(func.toString());
            result.push(')');
            return result.join('');
        };

        content = eval(content);
        return content;
    },
    packages = [{
        'name': 'app',
        'location': './src',
        'main': 'app/bootstrap'
    }, {
        'name': 'ng',
        'location': './src',
        'main': 'app/ng'
    }],
    modules = {
        'app': {
            'name': 'app',
            'include': ['app'],
            'out': '../dist/company/src/app/app.js',
            'wrap': {
                'endFile': '_wrap_bootstrap.js'
            },
            'exclude': ['ng', 'text', 'jquery']
        },
        'ng': {
            'name': 'ng',
            'include': ['ng'],
            'out': '../dist/company/src/app/ng.js',
            'exclude': ['text', 'jquery']
        }
    };

var sysModules = ['book', 'apr', 'ent', 'index', 'order', 'profile'];
for (var i = 0, l = sysModules.length; i < l; i++) {
    var name = sysModules[i];
    packages.push({
        'name': name,
        'location': './src',
        'main': name + '/main'
    });
    modules[name] = {
        'name': name,
        'include': [name],
        'out': '../dist/company/src/' + name + '/main.js',
        'exclude': ['ng', 'text', 'jquery'],
        wrap: {
            start: '',
            end: 'define(["' + name + '"],function(){});'
        },
        onBuildRead: replaceJsSubfix
    }
}

defaults.packages = packages;

var tmp = null,
    result = {};
for (var i in modules) {
    tmp = JSON.parse(JSON.stringify(defaults));
    result[i] = _.extend({}, tmp, modules[i]);
}

module.exports = result;
