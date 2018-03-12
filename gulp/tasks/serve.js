const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const historyApiFallback = require('connect-history-api-fallback')

gulp.task('serve', [ 'scripts', 'watch' ], function() {
  browserSync.init({
    server: {
      baseDir: './',
			middleware: [ historyApiFallback() ]
    }
  })
})
