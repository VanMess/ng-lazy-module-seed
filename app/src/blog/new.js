define(function() {
    'use strict';
    var controller = function($scope) {
        var ctrl = this;
        ctrl.title = '';
        ctrl.content = '';
        ctrl.save = _postArticle;

        return;

        function _postArticle() {
            alert('提交博文');
        }
    };
    return ['$scope', controller];
});
