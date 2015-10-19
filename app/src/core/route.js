define(['ng', '../index/router', '../blog/router', '../profile/router'], function(ng) {
    'use strict';
    var lazyDeferred = null,
        result = {};

    var args = arguments;
    for (var i = 1; i < args.length; i++) {
        ng.extend(result, args[i]);
    }
    return result;
});
