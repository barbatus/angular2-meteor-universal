var path = require('path');
var ExternalsPlugin = require('webpack-externals-plugin');

module.exports = {
  entry: {
    'client_renderer': './modules/client_renderer.ts',
    'meteor_xhr_impl': './modules/meteor_xhr_impl.ts',
    'server_renderer': './modules/server_renderer.ts',
    'angular_uni': './modules/angular_uni.ts'
  },
  output: {
    // We use CommonJS because of Meteor 1.3 specification that uses it
    libraryTarget: 'commonjs',
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: __dirname + '/node_modules',
    })
  ],
  externals: [
    {
      // We ignore the same file we compile so we wont get circular dependency
      // We also do not want to bundle them one inside the other
      './server_renderer': './server_renderer',
      './meteor_xhr_impl': './meteor_xhr_impl',
      './client_renderer': './client_renderer'
    }
  ],
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};
