'use strict'

const path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , babelConfig = require('./babel.config')
    , TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  cache: true,
  entry: {
    app: {
      import: path.resolve('src', 'index.jsx'),
      dependOn: 'lib'
    },
    lib: [           
            "react",
            "react-dom",            
                       
            "d3-force",            
            "d3-selection",           
            "d3-time",
            "d3-time-format",

            "lodash.flattendeep"                                   
    ],
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      chunkFilename: "[name]_[chunkhash].js",
      publicPath: 'app/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
             cacheDirectory: true,
             ...babelConfig
          }
        },
        include: [
          path.join(__dirname),
          path.join(__dirname, "src"),
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins : [
    new HtmlWebpackPlugin({
      minify: false,
      filename: path.resolve('index.html'),
      template: path.resolve('template', 'index.ejs'),
      inject: false
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
