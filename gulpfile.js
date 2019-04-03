var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat-css'),
  rename = require('gulp-rename'),
  cleanCss = require('gulp-clean-css'),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create(),
  fs = require('fs'),
  sourcemaps = require('gulp-sourcemaps'),
  sassGlob = require('gulp-sass-glob'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  plumber = require('gulp-plumber'),
  minifyCSS = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pug = require('gulp-pug');



gulp.task('html', function(){
  return gulp.src('./index.html')
    .pipe(gulp.dest('./project'))
    .pipe(browserSync.reload({stream: true}))
})

// gulp.task('pug', function () {
//   return gulp.src('./src/pages/**/*.pug')
//     .pipe(plumber())
//     .pipe(pug({
//       //locals: JSON.parse(fs.readFileSync('./content.json', 'utf8')),
//       pretty: true
//     }))
//     .pipe(gulp.dest("./project"))
//     .pipe(browserSync.reload({ stream: true }))
// })

//gulp.task('sass', function () {
//  return gulp.src(['node_modules/normalize.css/normalize.css', 'src/style/main.scss'])
//    .pipe(plumber())
//    .pipe(sourcemaps.init())
//    .pipe(sassGlob())    
//    .pipe(sass())
//    .pipe(autoprefixer({
//      browsers: ['> 5%'],
//      cascade: false
//    }))
//    //.pipe(minifyCSS())
//    .pipe(cleanCss({ sourceMap: true, sourceMapInlineSources: true }))
//    
//    .pipe(concat('common.css'))    
//    .pipe(rename({ suffix: '.min' }))
//    .pipe(sourcemaps.write('./maps'))
//
//    //.pipe(cleanCss({sourcemaps: true}))
//    //.pipe(minifyCSS())
//    .pipe(gulp.dest('project/css'))
//    .pipe(browserSync.reload({ stream: true }))
//});

gulp.task('sass', function () {
  return gulp.src(['node_modules/normalize.css/normalize.css', 'css/**/*.css'])
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    // .pipe(sassGlob())    
    // .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: true
    }))
    //.pipe(minifyCSS())
    //.pipe(cleanCss({ sourceMap: true, sourceMapInlineSources: true }))
    // .pipe(csso())
    // .pipe(sourcemaps.write())
    //.pipe(concat('common.css'))    
    //.pipe(rename({ suffix: '.min' }))
    

    //.pipe(cleanCss({sourcemaps: true}))
    //.pipe(minifyCSS())
    .pipe(gulp.dest('project/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('image', function () {
  return gulp.src('./img/*.+(jpg|png)')
    .pipe(imagemin())
    .pipe(gulp.dest('project/img'))
});

gulp.task('image-css', function () {
  return gulp.src('./css/img/*.+(jpg|png)')
    .pipe(imagemin())
    .pipe(gulp.dest('project/css/img'))
});

/* gulp.task('clean', function () {
   return del(['project']);
 });*/

// This will run in this order:
// * build-clean
// * build-scripts and build-styles in parallel
// * build-html
// * Finally call the callback function
gulp.task('build', function (callback) {
  runSequence(
    ['html', 'sass', 'image', 'image-css'],
    'serve',
    'watch',
    callback);
    browserSync.reload({ stream: true })
});

// Watch'er

gulp.task('watch', function () {
  gulp.watch('./index.html', ['html']),
  gulp.watch(['**/*.html'], ['html'])
  gulp.watch('css/**/*.css', ['sass'])
  gulp.watch('src/img/*.+(jpg|png)', ['image-css'])
  gulp.watch('src/img/*.+(jpg|png)', ['image'])
  //gulp.watch('src/**/*.scss', function (event) {
  //  gulp.run('sass');
  //})
})


// Static server
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./project"
    }
  });
});



gulp.task('default', ['build'], function () {
  console.log('Gulp запустился!');
});