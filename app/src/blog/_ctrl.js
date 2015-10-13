define([
    './list.js',
    './detail.js'
], function(listCtrl, detailCtrl) {
    'use strict';

    var controllers = {
        BlogListCtrl: listCtrl,
        BlogCtrl: detailCtrl
    };


    return controllers;
});
