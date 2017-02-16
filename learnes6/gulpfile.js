var gulp = require('gulp');
	// livereload = require('gulp-livereload'),
	// connect = require('gulp-connect'), //创建web服务器
	// uglify = require("gulp-uglify"),//js压缩混淆
	// concat = require('gulp-concat');//文件合并all-in-one

var $ = require('gulp-load-plugins')();

//es6 Babel编译
gulp.task('es6',function () {
	return gulp.src('src/es6js/*.js')
		.pipe($.babel({
			presets:['es2015']
		}))

		.pip
		.pipe(gulp.dest('dist/es5js/'))
});
//创建web服务器任务
gulp.task('web',function() {
	$.connect.server({
		port:4300,
		root:'dist',
		livereload:true
	})
});
//自动刷新
gulp.task('reload',function () {
	gulp.src([
		"dist/*.html"
	]).pipe($.connect.reload());
});
//监听文件
gulp.task('watch',function () {  
	gulp.watch(['src/es6js/*.js','src/*.html','dist/*.html'],['es6','reload'])
});

gulp.task("default",function(){
	console.log("开始执行默认任务");
});

gulp.task('default',["web","reload","watch","es6"]);