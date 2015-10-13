define([
    './list.js',
    './detail.js',
    './new.js'
], function(listCtrl, detailCtrl, newCtrl) {
    'use strict';

    var controllers = {
        BlogListCtrl: listCtrl,
        BlogCtrl: detailCtrl,
        CreateCtrl: newCtrl
    };


    return controllers;
});
