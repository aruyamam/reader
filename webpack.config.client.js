const path = require('path');
const webpack = require('webpack');

const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
   name: 'browser',
   mode: 'development',
   devtool: 'eval-source-map',
   entry: [
      'webpack-hot-middleware/client?reload=true',
      '@babel/polyfill',
      path.join(CURRENT_WORKING_DIR, 'client/index.js'),
   ],
   output: {
      path: path.join(CURRENT_WORKING_DIR, '/dist'),
      filename: 'bundle.js',
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.css$/,
            use: [
               { loader: 'style-loader' },
               {
                  loader: 'css-loader',
                  options: {
                     modules: true,
                  },
               },
            ],
         },
         {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
         },
      ],
   },
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   plugins: [new webpack.HotModuleReplacementPlugin()],
};
