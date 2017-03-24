const gulp            = require('gulp');
const gulpSequence    = require('gulp-sequence');
const getEnabledTasks = require('../lib/getEnabledTasks');

const productionTask = function(cb) {
  global.production = true;

  const tasks = getEnabledTasks('production');
  const static = TASK_CONFIG.static ? 'static' : false;

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'size-report', static, cb);
}

gulp.task('build', productionTask);
module.exports = productionTask;
