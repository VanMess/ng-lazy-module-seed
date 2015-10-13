
require.config({
    baseUrl: '/src',
    paths: {
        'ng': './app/ng'
    }
});

require(['ng', 'app'], function(ng, app) {
	'use strict';
});
