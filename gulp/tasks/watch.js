
const gulp = require('gulp')
const batch = require('gulp-batch')
const watch = require('gulp-watch')

gulp.task('watch', function() {

	watch('v2/**/*.js', batch(function(events, done) {
		gulp.start('scripts', done);
	}))

});
