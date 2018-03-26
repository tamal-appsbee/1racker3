import gulp from 'gulp';
import server from 'gulp-server-livereload';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import livereload from 'gulp-livereload';
/* Setting up server for building
 *
 * SERVER ADDRESS: http://localhost:8000/
 *
 */

gulp.task('webserver', function() {
  gulp.src('./') // ('./') for source all folder
    .pipe(server({
      livereload: false,
      directoryListing: false,
      open: true
    }));
});


/* Admin panel gulp task
 *
 * Style task for sass to css compiler
 * js task for compile js to dest js
 *
 */

gulp.task('styles', function() {
  return watch('./assets/src/sass/**/*.scss', function() {
    gulp.src(['./assets/src/sass/styles.scss', './assets/src/sass/vendor-styles.scss' ])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sass())
    .pipe(notify({
      title: 'Gulp',
      subtitle: 'success',
      message: 'Admin Sass Task',
      sound: 'Pop',
    }))
    .pipe(livereload())
    .pipe(gulp.dest('./assets/css/'));
  });
});

gulp.task('js', function() {
  gulp.src(['./assets/src/js/scripts.js', './assets/src/js/customize-chart.js', './assets/src/js/customize-chart-two.js', './assets/src/js/google-maps.js'])
  .pipe(livereload())
  .pipe(gulp.dest('./assets/js/'));
});


gulp.task('html', function() {
  gulp.src('./*.html')
  .pipe(livereload());
})


/*
 *  Watch task.
 *  Watch all files that are mentioned in the folder
 *  and if the file change just run the coresponding task
 *
 */

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('./assets/src/sass/**/*.scss', ['styles']);
  gulp.watch('./assets/src/js/*.js', ['js']);
  gulp.watch('./*.html', ['html']);

  //gulp.watch('./ecommerce/assets/src/sass/**/*.scss', ['stylesEcommerce']);
  //gulp.watch('./ecommerce/assets/src/js/scripts.js', ['jsEcommerce']);
});


/* Gulp default task
 *
 * You can change the task with your development basis
 * it will perform faster if you use speciefic task for default
 *
 */

gulp.task('default', ['watch', 'styles', 'js', 'webserver']);
