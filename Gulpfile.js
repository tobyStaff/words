var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
/* ------------------------------ *\
    DEFAULT GULP TASK (REQUIRED)
\* ------------------------------ */
gulp.task('default', function() {
    // place code for your default task here
    console.log('gulp hello')
});
/* ------------------------------ *\
    DEFAULT GULP TASK (REQUIRED)
\* ------------------------------ */
gulp.task('webpack', function() {
  return gulp.src('app/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('app/'));
});
/* ------------------------------------ *\
    WATCH JS CHANGES
\* ------------------------------------ */
gulp.task('watch', function() {
    gulp.watch('app/**/**/*.js', ['webpack']);
    gulp.watch('app/**/**/*.scss', ['sass']);
});
/* --------------------------- *\
    COMPILE SASS CODE TO CSS
\* --------------------------- */
gulp.task('sass', function() {
    gulp.src('app/imports.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/'));
});