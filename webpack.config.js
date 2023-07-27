const glob = require('glob');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: () => {
    // Get all .js files in the test directory
    const files = glob.sync('./src/tests/**/*.js', { absolute: true });

    // Create an entry for each file
    const entries = files.reduce((_, file) => {
      const entry = {
        ..._,
        [path.basename(file).replace('.test.js', '')]: file,
      };
      return entry;
    }, {});

    // Return the entries
    return entries;
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }
    }],
  },
  target: 'web',
  externals: /^(k6|https?:\/\/)(\/.*)?/,
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000,
  },
  devtool: 'source-map',
};
