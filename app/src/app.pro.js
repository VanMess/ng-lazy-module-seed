require.config({
    baseUrl: './src'
});

require(['./config/cfg.pro', './bootstrap'], function(systemConfig, bootstrap) {
    bootstrap(systemConfig);
});
