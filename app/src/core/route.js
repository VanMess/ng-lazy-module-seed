define([], function() {
    'use strict';
    var htmlBase = '/src/',
        lazyDeferred = null,
        routes = {
            /*
             * 	index 模块
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
            },
            /*
             * 	个人信息管理 模块
             */
            'profile': {
                url: '/p',
                template: '<div ui-view></div>',
                abstract: true,
                resolve: {
                    load: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return lazyDeferred = $ocLazyLoad.load([{
                                files: [
                                    '/css/profile.css'
                                ]
                            }, {
                                name: 'app.profile',
                                files: [htmlBase + 'profile/main.js']
                            }]);
                        }
                    ]
                }
            },
            'profile.reset': {
                url: '/reset',
                templateUrl: htmlBase + 'profile/resetPassword.html',
                data: {
                    title: '重置密码'
                }
            },
            /*
             * 	博客 模块
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
