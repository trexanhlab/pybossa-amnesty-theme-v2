var gulp       = require('gulp');  
var browserSync = require('browser-sync').create();
var less       = require('gulp-less');  
var watch      = require('gulp-watch');  
var minifyCSS  = require('gulp-minify-css');  
var rename     = require('gulp-rename');  

var runSequence = require('run-sequence');

var clean = require('gulp-clean');

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');

var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var bower = require('gulp-bower');

var amnestyThemeFolder = './amnesty-theme';

// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: '.'
//     },
//   })
// });

gulp.task('copy', function(){
    gulp.src([amnestyThemeFolder + '/static/fonts/**/*.*'], {base: amnestyThemeFolder + '/static/fonts'})
    .pipe(gulp.dest('css/fonts'));

    //as css and html location in amnesty theme repo is different with pybossa so we need to copy images to 2 locations
    gulp.src([amnestyThemeFolder + '/static/img/**/*.*'], {base: amnestyThemeFolder + '/static/img'})
    .pipe(gulp.dest('img'));

    gulp.src([amnestyThemeFolder + '/static/img/**/*.*'], {base: amnestyThemeFolder + '/static/img'})
    .pipe(gulp.dest('css/img'));

    //copy js (pulled by bower)
    gulp.src([amnestyThemeFolder + '/libs/**/*.*'], {base: amnestyThemeFolder + '/libs'})
    .pipe(gulp.dest('js/libs'));

    //copy custom js
    gulp.src([amnestyThemeFolder + '/static/js/**/*.*'], {base: amnestyThemeFolder + '/static/js'})
    .pipe(gulp.dest('js'));
});

// gulp.task('clean', function () {
//   return gulp.src('dist', {read: false})
//     .pipe(clean());
// });


gulp.task('bower', function() {
  return bower({cwd: amnestyThemeFolder});
});


/* Task to compile less */
var amnestyLessFolder = amnestyThemeFolder + '/static/bootstrap/less';
gulp.task('compile-less:custom-bootstrap', function() {  
  return gulp.src(amnestyLessFolder + '/bootstrap.less')
    .pipe(less())
    .pipe(rename('bootstrap.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('compile-less:amnesty-style', function() {  
  return gulp.src(amnestyLessFolder + '/amnesty/amnesty.less')
    .pipe(less())
    .pipe(rename('amnesty.css'))
    .pipe(gulp.dest('./css/'));
});

// gulp.task('compile-less:page-style', function() {  
//   return gulp.src(amnestyLessFolder + '/pages/*.less')
//     .pipe(less())
//     .pipe(gulp.dest('./css/'));    
// });

gulp.task('compile-less', ['compile-less:custom-bootstrap', 'compile-less:amnesty-style', 'compile-less:page-style']);

// gulp.task('useref', ['clean'], function () {
//     var jsFilter = filter("**/*.js", { restore: true });
//     var cssFilter = filter("**/*.css", { restore: true });
//     var indexHtmlFilter = filter([
//       '**/*', 
//       '!**/index.html', 
//       '!**/style-guide.html',
//       '!**/results.html'
//     ], { restore: true });

//     return gulp.src([
//           'index.html', 
//           'style-guide.html',
//           'results.html'
//         ])
//         .pipe(useref())
//         .pipe(jsFilter)
//         .pipe(uglify())
//         .pipe(jsFilter.restore)
//         .pipe(cssFilter)
//         .pipe(minifyCSS())
//         .pipe(cssFilter.restore)
//         .pipe(indexHtmlFilter)
//         .pipe(rev())
//         .pipe(indexHtmlFilter.restore)
//         .pipe(revReplace())
//         .pipe(gulp.dest('dist'));
// });


// gulp.task('watch', ['browserSync', 'compile-less'], function() {  
//   gulp.watch('./static/bootstrap/less/**/*.less' , function(){
//     runSequence('compile-less', browserSync.reload)
//   });
//   gulp.watch('./*.html', browserSync.reload); 
//   gulp.watch('./*.js', browserSync.reload); 
// });

/* Task when running `gulp` from terminal */
// gulp.task('default', ['compile-less', 'watch-less']);

/* Task when running `gulp build` from terminal */
// gulp.task('build', function(){
//   runSequence('compile-less', 'useref', 'copy');
// });

/* build on live dev server */
// gulp.task('build-dev-server', function(){
//   runSequence('bower', 'compile-less', 'useref', 'copy');
// });