if(!TASK_CONFIG.javascripts) return;

const path            = require('path');
const pathToUrl       = require('./pathToUrl');
const webpack         = require('webpack');

module.exports = function(env) {

  const jsSrc   = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.javascripts.src);
  const jsDest  = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest);
  const publicPath = pathToUrl(TASK_CONFIG.javascripts.publicPath || PATH_CONFIG.javascripts.dest, '/');

  const extensions = TASK_CONFIG.javascripts.extensions.map( (extension) => '.' + extension );

  const filenamePattern = '[name].js';

  const defaultBabelConfig = {
    presets: ['es2015']
  };

  const testPattern = new RegExp(`(\\${TASK_CONFIG.javascripts.extensions.join('$|\\.')}$)`);

  const webpackConfig = {
    context: jsSrc,
    output: {},
    plugins: [],
    resolve: {
      modules: [
        jsSrc,
        path.resolve(process.env.PWD, 'node_modules')
      ],
      extensions: [].concat(extensions),
      alias: TASK_CONFIG.javascripts.alias
    },
    resolveLoader: {
      modules: [ path.resolve(process.env.PWD, 'node_modules') ]
    },
    module: {

      rules: [
        {
          test: testPattern,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: TASK_CONFIG.javascripts.babel || defaultBabelConfig
          }],
        }
      ]
    }
  };

  // Add additional loaders from config
  webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts.rules || []);

  if(env === 'development') {

    webpackConfig.devtool         = TASK_CONFIG.javascripts.devtool || 'eval-cheap-module-source-map';
    webpackConfig.output.pathinfo = true;

    // Create new entries object with webpack-hot-middleware and react-hot-loader (if enabled)
    if(!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.enabled !== false) {
      for (var key in TASK_CONFIG.javascripts.entries) {
        var entry = TASK_CONFIG.javascripts.entries[key];
        // TODO: To work in < node 6, prepend process.env.PWD + node_modules/
        const entries = [];
        let middleware = 'webpack-hot-middleware/client?';

        if(!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.reload !== false) {
          middleware+= '&reload=true';
        }

        if(TASK_CONFIG.javascripts.hot && TASK_CONFIG.javascripts.hot.noInfo) {
          middleware+= '&noInfo=true';
        }

        if(TASK_CONFIG.javascripts.hot && TASK_CONFIG.javascripts.hot.quiet) {
          middleware+= '&quiet=true';
        }

        if(TASK_CONFIG.javascripts.hot && TASK_CONFIG.javascripts.hot.react) {
          entries.push('react-hot-loader/patch');
        }

        TASK_CONFIG.javascripts.entries[key] = entries.concat(middleware).concat(entry);
      }

      webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    // Addtional loaders for dev
    webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts.developmentRules || []);
  }

  if(env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = TASK_CONFIG.javascripts.entries;

    webpackConfig.output.path = path.normalize(jsDest);
    webpackConfig.output.filename = filenamePattern;
    webpackConfig.output.publicPath = publicPath;

    if(TASK_CONFIG.javascripts.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      );
    }

    // Addtional loaders for tests
    webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts.testRules || []);
  }

  if(env === 'production') {
    
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    );

    // Addtional loaders for production
    webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts.productionRules || [])
  }

  return webpackConfig;

};