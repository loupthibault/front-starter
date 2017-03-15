const compact = require('lodash/compact');

// Grouped by what can run in parallel;
const assetTasks = ['images', 'svgSprite'];
const codeTasks = ['html', 'stylesheets', 'javascripts'];

module.exports = function(env) {

  function matchFilter(task) {
    if(TASK_CONFIG[task]) {
      if(task === 'javascripts') {
        task = env === 'production' ? 'webpack:production' : false;
      }
      return task;
    }
  }

  function exists(value) {
    return !!value;
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists))
  };
}
