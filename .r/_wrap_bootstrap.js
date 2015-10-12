
require.config({
    baseUrl: '/src',
    paths: {
        'ng': './app/ng'
    }
});

require(['ng', 'app/app/bootstrap'], function(ng, app) {
	'use strict';
});
