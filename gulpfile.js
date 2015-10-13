var gulp = require('gulp'),
    path = require('path'),
    spawn = require('child_process').spawn,
    plugins = require('gulp-load-plugins'),
    $ = plugins({
        rename: {
            'gulp-ruby-sass': 'sass',
            'gulp-minify-css': 'minicss',
            'gulp-minify-html': 'minihtml',
            'gulp-contrib-copy': 'copy',
            'gulp-server-livereload': 'server'
        }
    }),
    config = {
        'root': './app',
        'dist': './dist',
        'scss': '.scss',
        'js': 'src',
        'css': 'css',
        'res': [{
            // 资源目录
            src: 'res',
            // 此目录下需要拷贝的资源类型
            file: ['**'],
            // 此目录下需要，资源过滤
            filter: ['*']
        }, {
            src: 'img',
            file: ['**'],
            filter: ['*']
        }],
        'deps': [{
            src: './app/libs/requirejs/require.js',
            name: 'require.js',
            output: 'libs/requirejs'
        }]
    };

/*
 *   watch file modified
 */
gulp.task('watch', function() {
    gulp.watch(path.join(config.root, config.scss, '**/*.scss'), ['prec:css']);
    gulp.watch(path.join(config.root, config.js, '**/*.js'), ['prec:js']);
    gulp.run('server');
});

gulp.task('server', function() {
    gulp.src(config.root)
        .pipe($.server({
            livereload: true,
            directoryListing: false,
            open: true,
            port: '4001',
            defaultFile: 'index.html'
        }));
});

/*
 *	run
 */
gulp.task('prec:css', function() {
    var src = path.join(config.root, config.scss, '**/*.scss'),
        dist = path.join(config.root, config.css);
    return $.sass(src, {
            sourcemap: false,
            compass: true,
            style: 'expanded',
            lineNumbers: true
        })
        .on('error', $.sass.logError)
        .pipe(gulp.dest(dist))
        .pipe($.csslint({
            lookup: true
        }))
        .pipe($.csslint.reporter())
        .pipe($.csscomb())
        .pipe(gulp.dest(dist))
});

gulp.task('prec:js', function() {
    var src = path.join(config.root, config.js, '**/*.js');
    return gulp.src(src)
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

/*
 *	production
 */
gulp.task('default', function() {
    gulp.run('prec:css');
    gulp.run('pro:css');
    gulp.run('prec:js');
    gulp.run('pro:js');
    gulp.run('pro:html');
    gulp.run('pro:res');
    if (process.argv.indexOf('-a') > 0) {
        gulp.run('pro:r:js');
    } else {
        gulp.run('pro:server');
    }
});
gulp.task('pro:server', function() {
    gulp.src(config.dist)
        .pipe($.server({
            livereload: false,
            directoryListing: false,
            open: true,
            port: '4002',
            defaultFile: 'index.html'
        }));
});

//  css 打包
gulp.task('pro:css', function() {
    var src = path.join(config.root, config.css, '**/*.css'),
        dist = path.join(config.dist, config.css);

    gulp.src(src)
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true,
            remove: false
        }))
        .pipe($.sourcemaps.init())
        .pipe($.minicss())
        .pipe($.sourcemaps.write(path.join(__dirname, '.maps'), {
            includeContent: false
        }))
        .pipe(gulp.dest(dist));
});

//	非 require 环境 js 打包
gulp.task('pro:js', function() {
    var deps = config.deps,
        dist;

    for (var i = 0, l = deps.length; i < l; i++) {
        dist = path.join(config.dist, deps[i].output);
        gulp.src(deps[i].src)
            .pipe($.concat(path.basename(deps[i].name)))
            .pipe($.uglify())
            .pipe(gulp.dest(dist));
    }
});

// 	requirejs 环境 js 打包
gulp.task('pro:r:js', function() {
    var buildProcess = spawn('node', ['build.js'], {
        cwd: path.join(process.cwd(), '.r')
    });
    buildProcess.stdout.setEncoding('utf-8');
    buildProcess.stdout.on('data', function(data) {
        console.log(data);
    });
    buildProcess.stderr.setEncoding('utf-8');
    buildProcess.stderr.on('data', function(data) {
        console.log(data);
        throw new Error(data);
    }).on('close', function() {
        if (process.argv.indexOf('-a') > 0) {
            gulp.run('pro:server');
        }
    });
    return buildProcess;
});

// 	html 打包
gulp.task('pro:html', function() {
    var src = path.join(config.root, '/**/*.html'),
        dist = config.dist;
    gulp.src(src)
        .pipe($.minihtml({
            empty: true,
            conditionals: true,
            quotes: true,
            spare: true
        }))
        .pipe(gulp.dest(dist))
        .pipe($.count('## html file be uglify'));
});

// 	资源拷贝
gulp.task('pro:res', function() {
    var src, dist;
    for (var i = 0, l = config.res.length; i < l; i++) {
        src = path.join(config.root, config.res[i].src, '**');
        dist = path.join(config.dist, config.res[i].src);

        gulp.src(src)
            .pipe($.filter(config.res[i].filter))
            .pipe(gulp.dest(dist));
    }
});
