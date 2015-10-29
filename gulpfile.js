var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
    return gulp.src(['test/setup.js', 'test/**/*.spec.js'], {read: false})
        .pipe(mocha({ timeout: 60000, slow: 15000 }));
});

gulp.task('default', ['lint', 'test'], function () {

});
