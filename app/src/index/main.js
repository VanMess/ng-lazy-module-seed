/*
 *	index 模块主入口
 */
define([
	'ng'
], function(ng) {
	'use strict';

	var MODULE_NAME = 'index',
		module = ng.$$init(MODULE_NAME, {
		});

	return module;
});
