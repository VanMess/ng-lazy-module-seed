define(function() {
    'use strict';
    var htmlBase = '/src/',
        lazyDeferred = null,
        routes = {
            /*
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
            }
             */
        };

    return routes;
});
