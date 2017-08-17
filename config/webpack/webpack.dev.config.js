const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, '../../dev/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../../dev'),
		publicPath: '/'
  }, 
  devServer: {
    contentBase: path.join(__dirname, '../../dev'),
    hot: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
