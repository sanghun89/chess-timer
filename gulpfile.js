var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var browserify = require('browserify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var runSeq = require('run-sequence');
var eslint = require('gulp-eslint');

gulp.task('lintJS', function () {
    return gulp.src(['./src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});


gulp.task('buildJS', ['lintJS'] , function () {

    var b = browserify();
    b.add('./src/app.js');

    b.transform(babelify);

    b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/'));

});

gulp.task('buildCSS', function () {
    return gulp.src('./src/main.scss')
        .pipe(plumber())
        .pipe(sass({
            style : 'expanded' // for dev
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public/'))
});

// ----------------------------------------------------------
gulp.task('build', function () {
    runSeq(['buildJS', 'buildCSS']);
});

gulp.task('default', function () {
    gulp.start('build');

    gulp.watch('src/**/*.js', function () {
        runSeq('buildJS');
    });

    gulp.watch('src/**/*.scss', function () {
        runSeq('buildCSS');
    });
});