/*global require*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(bs.reload({stream: true}))
});

gulp.task('serve', function() { 
    bs.init({
        server: { 
            baseDir: './' 
        },
        notify: false 
    });
    gulp.watch('sass/**/*.scss', gulp.parallel('sass')); 
    gulp.watch('./**.html').on('change', bs.reload);
});

gulp.task('default', gulp.parallel('serve'));
