'use strict';
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	gulpif = require('gulp-if'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	useref = require('gulp-useref'),
	wiredep = require('wiredep').stream,
	imagemin = require('gulp-imagemin');

//////////
// CSS //
//////////
gulp.task('sass', function () {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('prefix', function () {
	return gulp.src('app/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 200 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'));
});
// CSS

///////////
// build //
///////////
gulp.task('build', ['clean','imagemin'], function () {
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpif('*.js', uglify()))
	.pipe(gulpif('*.css', cleanCSS({compatibility: 'ie8'})))
	.pipe(gulp.dest('dist'));
});


gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
	.pipe(clean());
});

gulp.task('imagemin', () =>
    gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
// build

///////////
// bower //
///////////
gulp.task('bower', function () {
	gulp.src('app/index.html')
	.pipe(wiredep({
		directory : "bower_components"
	}))
	.pipe(gulp.dest('./app'));
});
// bower

///////////
// Watch //
///////////
gulp.task('default', ['bower'], function(){
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/css/*.css', ['prefix']);
});
// Watch