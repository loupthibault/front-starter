if(!TASK_CONFIG.stylesheets) return;

const path         = require('path');
const gulp         = require('gulp');
const gulpif       = require('gulp-if');
const sass         = require('gulp-sass');
const cssnano      = require('gulp-cssnano');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');
const handleErrors = require('../lib/handleErrors');


const stylesheetsTask = function() {

  const paths = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, '**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'),
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
  };

  if(TASK_CONFIG.stylesheets.sass && TASK_CONFIG.stylesheets.sass.includePaths) {
    TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map(function(includePath) {
      return path.resolve(process.env.PWD, includePath);
    });
  }

  // this should always be false, since we're autoprefixing separately
  const cssnanoConfig = TASK_CONFIG.stylesheets.cssnano || {}
  cssnanoConfig.autoprefixer = false 

  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(TASK_CONFIG.stylesheets.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(TASK_CONFIG.stylesheets.autoprefixer))
    .pipe(gulpif(global.production, cssnano(cssnanoConfig)))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

gulp.task('stylesheets', stylesheetsTask);
module.exports = stylesheetsTask;