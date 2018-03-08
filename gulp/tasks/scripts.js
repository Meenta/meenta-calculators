const gulp = require('gulp');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

// Load all the app specific files.
gulp.task('scripts', function() {

	var files = [
		'./v2/**/*.js'
	];

	return gulp.src(files)
		.pipe(concat('app.js'))
		// .pipe(uglify({ mangle: true }))
		.pipe(gulp.dest('./dist/'))

});
