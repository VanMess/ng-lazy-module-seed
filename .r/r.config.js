var util = require('util'),
	_ = require('underscore'),
	fs = require('fs'),
	defaults = require('./_r.config.json');

var packages = [{
		'name': 'app',
		'location': './',
		'main': 'app.pro'
	}, {
		'name': 'ng',
		'location': './',
		'main': 'ng'
	}],
	modules = {
		'app': {
			'name': 'app',
			'include': ['app'],
			'out': '../dist/src/app.js',
			'exclude': ['ng', 'jquery']
		},
		'ng': {
			'name': 'ng',
			'include': ['ng'],
			'out': '../dist/src/ng.js',
			'exclude': ['jquery']
		}
	},
	sysModules = defaults.sysModules;

for (var i = 0, l = sysModules.length; i < l; i++) {
	var name = sysModules[i];
	packages.push({
		'name': name,
		'location': './' + name,
		'main': 'main'
	});
	modules[name] = {
		'name': name,
		'include': [name],
		'out': '../dist/src/' + name + '/main.js',
		'exclude': ['ng', 'jquery'],
		wrap: {
			start: '',
			end: 'define(["' + name + '"],function(){});'
		},
		onBuildRead: replaceJsSubfix
	}
}

loadRequireConfig();
defaults.packages = packages;

var tmp = null,
	result = {};
for (var i in modules) {
	tmp = JSON.parse(JSON.stringify(defaults));
	result[i] = _.extend({}, tmp, modules[i]);
}

module.exports = result;

function replaceJsSubfix(moduleName, path, content) {
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
}

function loadRequireConfig() {
	var root = fs.readFileSync(defaults.configFile, 'UTF-8'),
		// fake window define
		window = {
			requirejs: function() {}
		};
	window.requirejs.config = function(config) {
		defaults.paths = config.paths;
		defaults.paths['text'] = '../libs/text/text';
		defaults.shim = config.shim;
	};
	eval(root);
	console.log(defaults);
}
