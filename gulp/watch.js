'use strict';

var gulp = require('gulp');

gulp.task('watch', ['styles', 'jshint:nofail', 'scripts'] ,function () {
  gulp.watch('app/**/*.styl', ['styles']);
  gulp.watch('app/modules/**/*.js', ['scripts', 'jshint:nofail']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
