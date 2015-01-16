'use strict';

var gulp = require('gulp');
var path = require('path');
var stylus = require('gulp-stylus');
var serve = require('gulp-serve');
var _ = require('lodash');
var nib = require('nib');

var util = require('./util');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});


// Favicon
//

gulp.task('favicon', function() {
  return gulp.src('app/favicon.ico')
    .pipe(gulp.dest('shell-dist'));
});


// JSHint
//

function jshint(failOnErr) {
  return function () {

    var reporter = $.jshint.reporter($.jshintStylish);
    if (failOnErr) {
      reporter.pipe($.jshint.reporter('fail'));
    }
    return gulp.src('app/modules/**/*.js')
      .pipe($.jshint())
      .pipe(reporter)
      .pipe($.size());
  }
}
gulp.task('jshint', jshint(true));
gulp.task('jshint:nofail', jshint(false));

// Styles
//

gulp.task('bootstrap-stylus', function() {
  return gulp.src('app/modules/common-styles/bootstrap-custom.styl')
    .pipe($.stylus({
      use: [nib()],
      errors: true,
      linenos: true,
      compress: false,
      include: ['app/modules/common-styles', 'app/bower_components/bootstrap-stylus/stylus']
    }))
    .pipe(gulp.dest('app/shell-static/styles'))
    .pipe($.size());
});

function styles(module) {
  return gulp.src(util.modStyles(module))
    .pipe($.stylus({
      errors: true,
      include: 'app/modules/common-styles'
    }))
    .pipe($.concat('main.css'))
    .pipe(gulp.dest(path.join('app', module + '-static', 'styles')))
    .pipe($.size());
}
gulp.task('styles', ['bootstrap-stylus'], _.wrap('shell', styles));


// Scripts
//

/**
 * Load JavaScript files into index.html in the appropriate order.
 * NOTE: The result index.html file should be checked into git after being
 * modified with any newly added scripts.
 */
function scripts(module) {
  var sorted = gulp.src(util.modScripts(module))
    .pipe($.order([
      '**/index.js',
      'app/modules/**/*.js'
    ]));

    return gulp.src(path.join('app', module + '.html'))
      .pipe($.inject(sorted, {
        read: false,
        starttag: '<!-- inject:scripts -->',
        addRootSlash: false,
        ignorePath: 'app/'
      }))
      .pipe(gulp.dest('app'))
      .pipe($.rename('index.html'))
      .pipe(gulp.dest(path.join('app', module + '-static')))
      .pipe($.size());
}
gulp.task('scripts', _.wrap('shell', scripts));


// Partials
//

function partials(module) {
  return gulp.src(util.modPartials(module), {cwdbase: true})
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'partials',
      stripPrefix: 'app/'
    }))
    .pipe($.concat('partials.min.js'))
    .pipe(gulp.dest(path.join('app', module + '-static', 'partials')))
    .pipe($.size());
}
gulp.task('partials', _.wrap('shell', partials));


// Final HTML
//

function jsPipeline() {
  var jsFilter = $.filter('**/*.js');
  return jsFilter
    .pipe($.ngmin())
    .pipe($.uglify())
    .pipe(jsFilter.restore());
}

function cssPipeline() {
  var cssFilter = $.filter('**/*.css');
  return cssFilter
    .pipe($.csso())
    .pipe(cssFilter.restore())
}

function finalHtml(module) {
  var assets;
  return gulp.src(path.join('app', module + '.html'))
    .pipe($.inject(gulp.src(
      path.join('app', module + '-static', 'partials', '*.js')), {
        read: false,
        starttag: '<!-- inject:partials -->',
        addRootSlash: false,
        ignorePath: 'app/'
      }))
    .pipe($.inject(gulp.src(
      path.join('app', module + '-static', 'styles', '*.css')), {
        read: false,
        starttag: '<!-- inject:css -->',
        addRootSlash: false,
        ignorePath: 'app/'
      }))
    .pipe($.rename('index.html'))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsPipeline())
    .pipe(cssPipeline())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(module + '-dist'))
    .pipe($.size());
}

gulp.task('final-html', ['styles', 'scripts', 'partials', 'fonts'], _.wrap('shell', finalHtml));

// gulp.task('images', function () {
//   return gulp.src('app/images/**/*')
//     .pipe($.cache($.imagemin({
//       optimizationLevel: 3,
//       progressive: true,
//       interlaced: true
//     })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe($.size());
// });

// Fonts
//

gulp.task('fonts', function () {
  return gulp.src('app/bower_components/bootstrap-stylus/**/*.{eot,svg,ttf,woff}')
    .pipe($.flatten())
    .pipe(gulp.dest('app/shell-static/fonts/'))
    .pipe(gulp.dest('shell-dist/fonts/'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['app/*static', '*dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['jshint:nofail', 'favicon', 'final-html']);
