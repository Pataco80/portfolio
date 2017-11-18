var gulp = require('gulp'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer'),
    uncss = require('gulp-uncss'),
    imagemin = require('gulp-imagemin'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync');

// TASKS
// Clean
gulp.task('clean', function(){
  return gulp.src('dist')
    .pipe(clean());
})

// Copy
gulp.task('copy', ['clean'], function(){
  return gulp.src([
    'src/components/bootstrap/dist/**/*',
    'src/components/bootstrap/fonts/**/*',
    'src/components/bootstrap/js/**/*',
    'src/components/font-awesome/css/**/*',
    'src/components/font-awesome/fonts/**/*'
  ], {"base": "src"})
    .pipe(gulp.dest('dist'));
})

// Sass
gulp.task('sass', function(){
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
      .pipe(cssnano())
  .pipe(gulp.dest('./dist/css/'));
})

// html
gulp.task('html', function(){
  return gulp.src('./src/*.html')
    .pipe(include())
    .pipe(gulp.dest('./dist/'));
})

// uncss
gulp.task('uncss', ['html'], function(){
  return gulp.src('./dist/components/**/*.css')
    .pipe(uncss({
      html: ['./dist/*.html']
  }))
  .pipe(gulp.dest('./dist/components/'));
})

// Image minification
gulp.task('imagemin', function(){
  return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'));
})

// Svg Min
gulp.task('svgmin', function(){
  
  return gulp.src(['src/inc/icons/*.svg', '!src/inc/icons/*.min.svg'])
    .pipe(imagemin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/inc/icons/'))
})

// JavaScript
gulp.task('scripts', function(){
  return gulp.src('./src/js/**/*')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
})

// Default
gulp.task('default', ['copy'], function(){
  gulp.start(['uncss', 'imagemin', 'sass', 'scripts'])
})

// Server
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
  gulp.watch('./dist/**/*').on('change', browserSync.reload)
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/scss/**/*.scss', ['sass'])
  gulp.watch('./src/js/**/*.js', ['scripts'])
  gulp.watch([
    './src/inc/icons/*.svg',
    '!./src/inc/icons/*.min.svg'
    ], ['svgmin'])
});
