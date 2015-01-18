var gulp = require('gulp');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var es6ify = require('es6ify');
var path = require('path');

gulp.task('buildJS', function () {

    var b = browserify();

    b.transform(reactify);
    b.transform(es6ify);
    b.add(path.join(__dirname, './js/main.js'));

    b.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(path.join(__dirname, './dist')));

});

gulp.task('buildCSS', function () {
    return gulp.src(path.join(__dirname, './sass/main.scss'))
        .pipe(sass())
        .pipe(gulp.dest(path.join(__dirname, './dist')));
});

gulp.task('default', ['buildJS', 'buildCSS']);

gulp.task('watchCSS', function () {
   gulp.watch('sass/**/*', ['buildCSS']);
});

gulp.task('watchJS', function () {
   gulp.watch('js/**/*', ['buildJS']);
});