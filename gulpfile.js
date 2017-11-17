var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync');

// TASKS
// Clean
gulp.task('clean', function(){
  return gulp.src('dist')
    .pipe(clean());
})

// Copy
gulp.task('copy', ['clean'], function(){
  gulp.src([
    'src/components/bootstrap/dist/**/*',
    'src/components/bootstrap/fonts/**/*',
    'src/components/bootstrap/js/**/*',
    'src/components/font-awesome/css/**/*',
    'src/components/font-awesome/fonts/**/*',
    'src/css/**/*',
    'src/js/**/*',
    'src/img/**/*'
  ], {"base": "src"})
    .pipe(gulp.dest('dist'));
})

// Sass
gulp.task('sass', function(){
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
  .pipe(gulp.dest('./dist/css/'));
})

// html
gulp.task('html', function(){
  return gulp.src('./src/*.html')
    .pipe(include())
    .pipe(gulp.dest('./dist/'));
})

// Server
gulp.task('serve', ['html'], function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
  gulp.watch('./dist/**/*').on('change', browserSync.reload)
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/scss/**/*.scss', ['sass'])
});
