define(function() {
    'use strict';
    var htmlBase = '/src/',
        lazyDeferred = null,
        routes = {
            /*
             *  博客 模块
             */
            'blog': {
                url: '/b',
                template: '<div ui-view></div>',
                abstract: true,
                resolve: {
                    load: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return lazyDeferred = $ocLazyLoad.load([{
                                files: [
                                    '/css/blog.css'
                                ]
                            }, {
                                name: 'app.blog',
                                files: [htmlBase + 'blog/main.js']
                            }]);
                        }
                    ]
                }
            },
            'blog.create': {
                url: '/create',
                templateUrl: htmlBase + 'blog/new.html',
                data: {
                    title: '新建博客'
                }
            },
            'blog.list': {
                url: '',
                templateUrl: htmlBase + 'blog/list.html',
                data: {
                    title: '博客列表'
                }
            },
            'blog.detail': {
                url: '/{id:[0-9]+}',
                templateUrl: htmlBase + 'blog/detail.html',
                data: {
                    title: '博客详情'
                }
            }
        };

    return routes;
});
