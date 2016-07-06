<<<<<<< HEAD
var gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    plugins = {
            less: require('gulp-less'),
            rename: require('gulp-rename'),
            concat: require('gulp-concat'),
            uglify: require('gulp-uglify'),
            minifyCss: require('gulp-minify-css'),
            minifyHtml: require('gulp-minify-html'),
            minifyInline: require('gulp-minify-inline'),
            htmlReplace: require('gulp-html-replace'),
            stripDebug: require('gulp-strip-debug'),
            chmod: require('gulp-chmod')
            },
    templateCache = require('gulp-angular-templatecache'),
    paths = { root: './', app: {}, assets: {}, publish: {} },
    sources = { js: {}, css: {}, less: '', fonts: '', img: '' };

paths.app.src = paths.root + 'public/';
paths.app.lib = paths.app.src + 'lib/';
paths.app.dist = paths.app.src + 'dist/';
paths.app.views = paths.app.src + 'views/';

paths.assets.root = paths.root + 'assets/';
paths.assets.css = paths.assets.root + 'css/';
paths.assets.less = paths.assets.css;
paths.assets.fonts = paths.assets.root + 'fonts/';
paths.assets.img = paths.assets.root + 'img/';

paths.publish.root = paths.root + 'publish/';
paths.publish.css = paths.publish.root + 'css/';
paths.publish.html = paths.publish.root + 'html/';
paths.publish.js = paths.publish.root + 'js/';
paths.publish.fonts = paths.publish.root + 'fonts/';
paths.publish.img = paths.publish.root + 'img/';


sources.js.controllers = paths.app.src + 'controllers/essential-js/*.js';
sources.js.directives = paths.app.src + 'directives/*.js';
sources.js.filters = paths.app.src + 'filters/*.js';
sources.js.services = paths.app.src + 'services/*.js';
sources.js.app = paths.app.src + 'app.js';

sources.css.main = [
    paths.assets.css + 'app.css',
    paths.assets.css + 'style.css',
    paths.assets.css + 'gateway-tabs.css',
    paths.assets.css + 'datepicker.css',
    paths.assets.css + 'flight-list.css',
];

function gulper(src, dest, fn) {
    fn = fn || [];
    var stream = gulp.src(src),
        apply = function (fn, args) { return stream = stream.pipe(fn.apply(this, args)); };
    if (!Array.isArray(fn)) {
        apply(fn, [].splice.call(arguments, 3));
    } else {
        var fnSets = [].splice.call(arguments, 2);
        fnSets.forEach(function (set) {
            apply(set[0], set.slice(1));    
        });
    }

    return stream
        .pipe(plugins.chmod(666))
        .pipe(gulp.dest(dest));
}

function concater(sources, concated, dest) {
    return gulper(sources, dest, plugins.concat, concated, { newLine: '\r\n' });
}

gulp.task('concat-js-controllers', function () {
    return concater(sources.js.controllers, 'controllers.js', paths.app.dist);
});
gulp.task('concat-js-directives', function () {
    return concater(sources.js.directives, 'directives.js', paths.app.dist);
});
gulp.task('concat-js-filters', function () {
    return concater(sources.js.filters, 'filters.js', paths.app.dist);
});
gulp.task('concat-js-services', function () {
    return concater(sources.js.services, 'services.js', paths.app.dist);
});
gulp.task('concat-js-app', function () {
    return concater(sources.js.app, 'app.js', paths.app.dist);
});

gulp.task('concat-js', ['concat-js-controllers', 'concat-js-directives', 'concat-js-filters', 'concat-js-services', 'concat-js-app']);




// gulp.task('sass', function() {
//   gulp.src('public/stylesheets/style.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(csso())
//     .pipe(gulp.dest('public/stylesheets'));
// });
// 
// gulp.task('compress', function() {
//   gulp.src([
//     'public/vendor/angular.js',
//     'public/vendor/*.js',
//     'public/app.js',
//     'public/services/*.js',
//     'public/controllers/*.js',
//     'public/filters/*.js',
//     'public/directives/*.js'
//   ])
//     .pipe(concat('app.min.js'))
//     .pipe(ngAnnotate())
//     .pipe(uglify())
//     .pipe(gulp.dest('public'));
// });
// 
// gulp.task('templates', function() {
//   gulp.src('public/views/**/*.html')
//     .pipe(templateCache({ root: 'views', module: 'MyApp' }))
//     .pipe(gulp.dest('public'));
// });
// 
// gulp.task('watch', function() {
//   gulp.watch('public/stylesheets/*.scss', ['sass']);
//   gulp.watch('public/views/**/*.html', ['templates']);
//   gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
// });

// gulp.task('default', ['sass', 'compress', 'templates', 'watch']);

    gulp.task('default', ['concat-js'], function () {
    gulp.watch(sources.js.controllers, ['concat-js-controllers']).on('change', reporter('running `concat-js-controllers` task'));
    gulp.watch(sources.js.directives, ['concat-js-directives']).on('change', reporter('running `concat-js-directives` task'));
    gulp.watch(sources.js.filters, ['concat-js-filters']).on('change', reporter('running `concat-js-filters` task'));
    gulp.watch(sources.js.services, ['concat-js-services']).on('change', reporter('running `concat-js-services` task'));
    gulp.watch(sources.js.app, ['concat-js-app']).on('change', reporter('running `concat-js-app` task'));
    

    function reporter(input) {
        var message = 'running tasks...';
        if (input.path) {
            return report(message, input);
        }
        return report.bind(null, input || message);
    }
    function report(message, event) {
        console.log(path.basename(event.path) + ' was ' + event.type + ' :', message);
    }
=======
var gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    plugins = {
            less: require('gulp-less'),
            rename: require('gulp-rename'),
            concat: require('gulp-concat'),
            uglify: require('gulp-uglify'),
            minifyCss: require('gulp-minify-css'),
            minifyHtml: require('gulp-minify-html'),
            minifyInline: require('gulp-minify-inline'),
            htmlReplace: require('gulp-html-replace'),
            stripDebug: require('gulp-strip-debug'),
            chmod: require('gulp-chmod')
            },
    templateCache = require('gulp-angular-templatecache'),
    paths = { root: './', app: {}, assets: {}, publish: {} },
    sources = { js: {}, css: {}, less: '', fonts: '', img: '' };

paths.app.src = paths.root + 'public/';
paths.app.lib = paths.app.src + 'lib/';
paths.app.dist = paths.app.src + 'dist/';
paths.app.views = paths.app.src + 'views/';

paths.assets.root = paths.root + 'assets/';
paths.assets.css = paths.assets.root + 'css/';
paths.assets.less = paths.assets.css;
paths.assets.fonts = paths.assets.root + 'fonts/';
paths.assets.img = paths.assets.root + 'img/';

paths.publish.root = paths.root + 'publish/';
paths.publish.css = paths.publish.root + 'css/';
paths.publish.html = paths.publish.root + 'html/';
paths.publish.js = paths.publish.root + 'js/';
paths.publish.fonts = paths.publish.root + 'fonts/';
paths.publish.img = paths.publish.root + 'img/';


sources.js.controllers = paths.app.src + 'controllers/essential-js/*.js';
sources.js.directives = paths.app.src + 'directives/*.js';
sources.js.filters = paths.app.src + 'filters/*.js';
sources.js.services = paths.app.src + 'services/*.js';
sources.js.app = paths.app.src + 'app.js';

sources.css.main = [
    paths.assets.css + 'app.css',
    paths.assets.css + 'style.css',
    paths.assets.css + 'gateway-tabs.css',
    paths.assets.css + 'datepicker.css',
    paths.assets.css + 'flight-list.css',
];

function gulper(src, dest, fn) {
    fn = fn || [];
    var stream = gulp.src(src),
        apply = function (fn, args) { return stream = stream.pipe(fn.apply(this, args)); };
    if (!Array.isArray(fn)) {
        apply(fn, [].splice.call(arguments, 3));
    } else {
        var fnSets = [].splice.call(arguments, 2);
        fnSets.forEach(function (set) {
            apply(set[0], set.slice(1));    
        });
    }

    return stream
        .pipe(plugins.chmod(666))
        .pipe(gulp.dest(dest));
}

function concater(sources, concated, dest) {
    return gulper(sources, dest, plugins.concat, concated, { newLine: '\r\n' });
}

gulp.task('concat-js-controllers', function () {
    return concater(sources.js.controllers, 'controllers.js', paths.app.dist);
});
gulp.task('concat-js-directives', function () {
    return concater(sources.js.directives, 'directives.js', paths.app.dist);
});
gulp.task('concat-js-filters', function () {
    return concater(sources.js.filters, 'filters.js', paths.app.dist);
});
gulp.task('concat-js-services', function () {
    return concater(sources.js.services, 'services.js', paths.app.dist);
});
gulp.task('concat-js-app', function () {
    return concater(sources.js.app, 'app.js', paths.app.dist);
});

gulp.task('concat-js', ['concat-js-controllers', 'concat-js-directives', 'concat-js-filters', 'concat-js-services', 'concat-js-app']);




// gulp.task('sass', function() {
//   gulp.src('public/stylesheets/style.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(csso())
//     .pipe(gulp.dest('public/stylesheets'));
// });
// 
// gulp.task('compress', function() {
//   gulp.src([
//     'public/vendor/angular.js',
//     'public/vendor/*.js',
//     'public/app.js',
//     'public/services/*.js',
//     'public/controllers/*.js',
//     'public/filters/*.js',
//     'public/directives/*.js'
//   ])
//     .pipe(concat('app.min.js'))
//     .pipe(ngAnnotate())
//     .pipe(uglify())
//     .pipe(gulp.dest('public'));
// });
// 
// gulp.task('templates', function() {
//   gulp.src('public/views/**/*.html')
//     .pipe(templateCache({ root: 'views', module: 'MyApp' }))
//     .pipe(gulp.dest('public'));
// });
// 
// gulp.task('watch', function() {
//   gulp.watch('public/stylesheets/*.scss', ['sass']);
//   gulp.watch('public/views/**/*.html', ['templates']);
//   gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
// });

// gulp.task('default', ['sass', 'compress', 'templates', 'watch']);

    gulp.task('default', ['concat-js'], function () {
    gulp.watch(sources.js.controllers, ['concat-js-controllers']).on('change', reporter('running `concat-js-controllers` task'));
    gulp.watch(sources.js.directives, ['concat-js-directives']).on('change', reporter('running `concat-js-directives` task'));
    gulp.watch(sources.js.filters, ['concat-js-filters']).on('change', reporter('running `concat-js-filters` task'));
    gulp.watch(sources.js.services, ['concat-js-services']).on('change', reporter('running `concat-js-services` task'));
    gulp.watch(sources.js.app, ['concat-js-app']).on('change', reporter('running `concat-js-app` task'));
    

    function reporter(input) {
        var message = 'running tasks...';
        if (input.path) {
            return report(message, input);
        }
        return report.bind(null, input || message);
    }
    function report(message, event) {
        console.log(path.basename(event.path) + ' was ' + event.type + ' :', message);
    }
>>>>>>> dc4086ff87bbe8b0509fa5d5cadbf530cfd7858e
});