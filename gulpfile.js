var gulp = require('gulp'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify');

gulp.task('jade', function () {
    return gulp.src('./src/templates/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./app'));
});

gulp.task('jshint', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task('less', function () {
    return gulp.src('./src/css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js', ['jshint']);
    gulp.watch('./src/css/**/*.less', ['less']);
    gulp.watch('./src/templates/**/*.jade', ['jade']);
});

gulp.task('default', ['jshint', 'jade', 'less', 'watch']);
