const gulp = require('gulp');
const path = require('path');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssmin = require('gulp-csso');

const config = {
	out: {
		js: './public/script',
		css: './public/style',
		html: './public/temp'
	},
	src: {
		js: [
			'./client/frame/script/before/*.js',
			'./client/frame/main.js',
			'./client/frame/script/after/*.js',
			'./client/core/**/api/ng.*.js',
			'./client/core/**/route/ng.*.js',
			'./client/core/**/ctrl/ng.*.js',
			'./client/frame/boot.js'
		],
		css: [
			'./client/core/**/style/ng.*.less',
			'./client/frame/style/main.less'
		]
	},
	watch: {
		css: './client/**/*.less',
		html: './client/**/*.html'
	}
};

gulp.task('default', ['js', 'css', 'html']);

gulp.task('dev', ['default'], function(){
	gulp.watch(config.src.js, ['js']);
	gulp.watch(config.watch.css, ['css']);
	gulp.watch(config.watch.html, ['html']);
});

gulp.task('css', function(){
	gulp.src(config.src.css)
		.pipe(less())
		.pipe(concat('index.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(config.out.css));
});

gulp.task('js', function(){
	gulp.src(config.src.js)
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.out.js));
});

gulp.task('html', function(){
	gulp.src(config.watch.html)
		.pipe(gulp.dest(config.out.html));
});