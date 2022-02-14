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
            "react", "react-dom",

            "react-stockcharts/lib/ChartCanvas",
            "react-stockcharts/lib/Chart",

            "react-stockcharts/lib/series/CandlestickSeries",
            "react-stockcharts/lib/series/BollingerSeries",
            "react-stockcharts/lib/series/LineSeries",
            "react-stockcharts/lib/series/BarSeries",
            "react-stockcharts/lib/series/RSISeries",

            "react-stockcharts/lib/axes/XAxis",
            "react-stockcharts/lib/axes/YAxis",


            "react-stockcharts/lib/coordinates/CrossHairCursor",
            "react-stockcharts/lib/coordinates/EdgeIndicator",
            "react-stockcharts/lib/coordinates/MouseCoordinateX",
            "react-stockcharts/lib/coordinates/MouseCoordinateY",

            "react-stockcharts/lib/tooltip/OHLCTooltip",
            "react-stockcharts/lib/tooltip/MovingAverageTooltip",
            "react-stockcharts/lib/tooltip/BollingerBandTooltip",
            "react-stockcharts/lib/tooltip/RSITooltip",

            "react-stockcharts/lib/indicator/sma",
            "react-stockcharts/lib/indicator/rsi",
            "react-stockcharts/lib/indicator/bollingerBand",
            "react-stockcharts/lib/helper/fitWidth",

            "d3-format", "d3-scale",
            "d3-time", "d3-time-format"

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
