module.exports = {

  browserSync: {
    server: {
      baseDir: "public"
    }
  },

  javascripts: {
    entries: {
      app: ["./main.js"]
    },
    extensions: ["js", "json"],
    extractSharedJs: false
  },

  stylesheets: {
    autoprefixer: {
      browsers: ["last 3 version"]
    },
    sass: {
      indentedSyntax: false,
      includePaths: [
        "./node_modules/normalize.css"
      ]
    },
    extensions: ["sass", "scss", "css"]
  },

  html: {
    dataFile: "_data/global.json",
    htmlmin: {
      collapseWhitespace: true
    },
    extensions: ["html", "json", ".svg"],
    excludeFolders: ["_layouts", "_shared", "_macros", "_data", "_svgs"]
  },

  images: {
    extensions: ["jpg", "png", "svg", "gif"]
  },

  fonts: {
    extensions: ["woff2", "woff", "eot", "ttf", "svg"]
  },

  static: true,

  svgSprite: {
    extensions: ["svg"]
  },

  watch: {
    gulpWatch: {
      usePolling: false
    }
  }
};
