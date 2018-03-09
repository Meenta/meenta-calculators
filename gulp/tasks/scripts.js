const gulp = require('gulp');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

// Load all the app specific files.
gulp.task('scripts', function() {

	var files = [
		'./bower_components/underscore/underscore.js',
		'./bower_components/angular/angular.js',
		'./bower_components/angular-animate/angular-animate.js',
		'./bower_components/angular-ui-router/release/angular-ui-router.js',
		'./bower_components/angular-filter/dist/angular-filter.js',
		'./bower_components/firebase/firebase.js',
		'./bower_components/angularfire/dist/angularfire.js',
		'./bower_components/keen-js/dist/keen.js',
		'./bower_components/angular-keenio/dist/angular-keenio.js',
		'./bower_components/angular-bootstrap/ui-bootstrap.js',
		'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'./v2/**/*.js'
	];

	return gulp.src(files)
		.pipe(concat('app.js'))
		// .pipe(uglify({ mangle: false }))
		.pipe(gulp.dest('./dist/'))

});
