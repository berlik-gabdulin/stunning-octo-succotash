"use strict";

var autoprefixerList = [
'Chrome >= 45',
'Firefox ESR',
'Edge >= 12',
'Explorer >= 10',
'iOS >= 9',
'Safari >= 9',
'Android >= 4.4',
'Opera >= 30'
];

var config = {
	server: {
		baseDir: 'build/'
	},
	port: 3000,
	open: false,
	notify: false
};

var gulp = require('gulp'),
browserSync = require('browser-sync'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename'),
scss = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
media = require('gulp-group-css-media-queries'),
pug = require('gulp-pug'),
uglify = require('gulp-uglify'),
cache = require('gulp-cache'),
imagemin = require('gulp-imagemin'),
jpegrecompress = require('imagemin-jpeg-recompress'),
pngquant = require('imagemin-pngquant'),
concat = require('gulp-concat'),
sort = require('gulp-sort');

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: "./build"
		},
		notify: false
	});
});

gulp.task('html:build', function () {
	gulp.src('app/markup/pages/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(plumber())
	.pipe(gulp.dest('build/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('css:build', function () {
	gulp.src([
		'app/libs/bootstrap/css/bootstrap-grid.min.css',
		'app/libs/jquery/jquery-ui.css',
		'app/libs/magnific-popup/magnific-popup.css',
		'app/libs/slick/slick.css',
		'app/libs/slick/slick-theme.css'
	])
	.pipe(concat('libs.css'))
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.reload({
		stream: true
	}));
	gulp.src('app/styles/master.scss')
	.pipe(plumber())
	.pipe(scss({
		includePaths: require('node-bourbon').includePaths
	}).on('error', scss.logError))
	// .pipe(media())
	.pipe(autoprefixer({
		browsers: autoprefixerList
	}))
	.pipe(cleanCSS({
		format: 'beautify'
	}))
	.pipe(rename({
		basename: 'common',
		// suffix: '.min'
	}))
	.pipe(gulp.dest('build/css/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('js:build', function () {
	gulp.src([
		'app/libs/jquery/jquery-3.3.1.min.js',
		'app/libs/jquery/jquery-migrate-1.4.1.min.js',
		'app/libs/jquery/jquery-ui.js',
		'app/libs/magnific-popup/jquery.magnific-popup.min.js',
		'app/libs/slick/slick.min.js',
		'app/libs/PageScroll2id.min.js',
		'app/libs/fontawesome/fontawesome-all.min.js',
		'app/libs/jquery.mask.js'
		])
	.pipe(plumber())
	.pipe(concat('libs.js'))
	.pipe(uglify()) //Minify libs.js
	.pipe(gulp.dest('build/js/'))
	.pipe(gulp.src('app/scripts/main.js'))
	.pipe(gulp.dest('build/js/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('fontSort', function(){
	gulp.src('app/fonts/**/*')
	.pipe(sort())
	.pipe(gulp.dest('build/fonts/'));
});

gulp.task('image:build', function () {
	gulp.src('app/images/**/*.*')
	.pipe(cache(imagemin([
		imagemin.gifsicle({
			interlaced: true
		}),
		jpegrecompress({
			progressive: true,
			max: 85,
			min: 80
		}),
		pngquant(),
		imagemin.svgo({
			plugins: [{
				removeViewBox: false
			}]
		})
		])))
	.pipe(gulp.dest('build/img/'));
});

gulp.task('build', [
	'html:build',
	'css:build',
	'js:build',
	'fontSort',
	'image:build'
	]);

gulp.task('watch', function () {
	gulp.watch('app/markup/**/*.pug', ['html:build']).on('change', browserSync.reload);
	gulp.watch('app/styles/**/*.*', ['css:build']).on('change', browserSync.reload);
	gulp.watch('app/scripts/**/*.js', ['js:build']).on('change', browserSync.reload);
	gulp.watch('app/images/**/*.*', ['image:build']).on('change', browserSync.reload);
});

gulp.task(
	'default',
	[
	'build',
	'browserSync',
	'watch'
	]
	);
