const gulp   = require('gulp');
const path   = require('path');
const watch  = require('gulp-watch');

const watchTask = function() {
  const watchableTasks = ['images', 'svgSprite', 'html', 'stylesheets', 'static'];

  function getTaskPathFor(taskName) {
    switch (taskName) {
      case 'svgSprite':
        return PATH_CONFIG.icons;
      default:
        return PATH_CONFIG[taskName];
    }
  }

  watchableTasks.forEach(function(taskName) {
    
    const taskConfig  = TASK_CONFIG[taskName];
    const taskPath    = getTaskPathFor(taskName);
    var watchConfig   = {};

    if (TASK_CONFIG.watch !== undefined && TASK_CONFIG.watch.gulpWatch !== undefined) {
      watchConfig = TASK_CONFIG.watch.gulpWatch;
    }

    if(taskConfig) {
      
      const srcPath = path.resolve(process.env.PWD, PATH_CONFIG.src, taskPath.src);
      const globPattern = '**/*' + (taskConfig.extensions ? '.{' + taskConfig.extensions.join(',') + '}' : '');

      watch(path.join(srcPath, globPattern), watchConfig, function() {
       require('./' + taskName)();
      });
    }
  })
}

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;