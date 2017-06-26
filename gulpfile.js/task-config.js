const path  = require('path');
const os    = require('os');
const pkg   = require(path.resolve(process.env.PWD, 'package.json'));

module.exports = {

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./main.js"]
    },
    extensions: ['js', 'jsx'],
    hot: {
      reload: true,
      noInfo: false,
      quiet: true,
      react: false
    },
    devtool: 'eval-cheap-module-source-map',
    babelLoader: {
      // "test" is derived from TASK_CONFIG.javascripts.extensions
      // "options" is derived from TASK_CONFIG.javascripts.babel
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    babel: {
      presets: [["es2015", { "modules": false }], 'stage-1']
    },
    development: {},
    production: {
      devtool: false,
      uglifyJsPlugin: {},
      definePlugin: {
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }
    }
  },

  stylesheets: {
    sass: {
      includePaths: [
        "./node_modules"
      ]
    },
    extensions: ["sass", "scss", "css"]
  },

  html: {
    dataFile: "_data/global.json",
    nunjucksRender: {
      envOptions: {
        watch: false
      }
    },
    htmlmin: {
      collapseWhitespace: true
    },
    excludeFolders: ["_layouts", "_shared", "_macros", "_data"],
    extensions: ["html", "njk", "json", "svg"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  ghPages: {
    branch: "gh-pages",
    cacheDir: path.join(os.tmpdir(), pkg.name || "front-starter")
  },

  svgSprite: {
    svgstore: {}
  },

  production: {
    rev: true
  },

  browserSync: {
    server: {
      baseDir: "public"
    },
    port: 8080
  }
};
