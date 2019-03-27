'use strict';

const path = require('path')
    , webpack = require('webpack')
    , WriteDllStats = require('./plugins/write-dll-stats');

module.exports = {
  entry: {
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

            "ccxt",
            "d3-format", "d3-scale",
            "d3-time", "d3-time-format"
          ]
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",

      library: '[name]_vendor'
  },
  resolve: {
    //root: path.resolve(__dirname, "client"),
    modules: ['local_modules','node_modules']
    //extensions: ['.js', '.jsx']
  },
  module: {
   rules: [
      {
        test: /\.js?$/,
        include: [
          path.join(__dirname, "node_modules", "d3-scale"),
          path.join(__dirname, "node_modules", "ccxt")
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', {modules: false}],
                'react',
                'stage-2'
              ]
            }
          }
        ]
      },{
        test: /ccxt\.js$/,
        use: [
          {
            loader: 'ccxt-exchanges-loader',
            options: {
              exchanges: [
                'binance',
                'bitfinex',
                'bittrex'
              ]
            }
          }
        ],
        include: [
          path.join(__dirname, "node_modules", "ccxt")
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
       'process.env' : {
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'dll/[name]-manifest.json',

      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_vendor'

      //context: path.resolve(__dirname, "client")
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
           //screw_ie8: true
        },
        output: {
           comments: false
        }
    }),
    new WriteDllStats()
  ]
}
