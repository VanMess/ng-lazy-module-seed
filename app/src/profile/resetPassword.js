define(function() {
    'use strict';
    var controller = function($scope) {
        var ctrl = this;

        ctrl.account = 'xxx@gmail.com';
        ctrl.ps = null;
        ctrl.psConfirm = null;
        ctrl.reset = _reset;

        return ctrl;

        function _reset() {
            alert('提交数据');
        }
    };
    return ['$scope', controller];
});
