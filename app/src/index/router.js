define(function() {
    'use strict';
    var htmlBase = '/src/',
        lazyDeferred = null,
        routes = {
            /*
             *  index 模块
             */
            'index': {
                url: '/',
                templateUrl: htmlBase + 'index/index.html',
                data: {
                    title: '首页'
                },
                resolve: {
                    load: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return lazyDeferred = $ocLazyLoad.load([{
                                files: [
                                    '/css/index.css'
                                ]
                            }, {
                                name: 'app.index',
                                files: [htmlBase + 'index/main.js']
                            }]);
                        }
                    ]
                }
            }
        };

    return routes;
});
