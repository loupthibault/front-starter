if(!TASK_CONFIG.images) return;

const browserSync = require('browser-sync');
const changed     = require('gulp-changed');
const gulp        = require('gulp');
const path        = require('path');

const imagesTask = function() {

  const paths = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.images.src, '**/*.{' + TASK_CONFIG.images.extensions + '}'),
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.images.dest)
  };

  return gulp.src([paths.src, , '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
