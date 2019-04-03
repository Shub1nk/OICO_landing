var gulp = require('gulp'),
	connect = require('gulp-connect');
	//livereload = require('gulp-livereload');

//livereload({start: true});

gulp.task('connect', function(){
	connect.server({
		root: '.',
		livereload: true
	});
});

gulp.task('html', function() {
	//console.log('HTML OK');
	return gulp.src('index.html')
		.pipe(connect.reload());
});

gulp.task('css', function() {
	//console.log('CSS OK');
	return gulp.src('')
		.pipe(connect.reload());
});

gulp.task('js', function() {
	return gulp.src('')
		.pipe(connect.reload());                                                  //console.log('JS OK');
	
});

gulp.task('watch', function(){
	gulp.watch('index.html', ['html']),
	gulp.watch('css/**/*.css', ['css']),
	gulp.watch('js/**/*.js', ['js']),
	gulp.watch('js/**/*.css', ['default']);
});


gulp.task('default', ['watch', 'css', 'js', 'connect'], function(){
	//console.log('Успех');
});