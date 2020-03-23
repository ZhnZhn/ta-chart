'use strict';

const path = require('path')
    , webpack = require('webpack')
    , WriteDllStatsPlugin = require('./plugins/write-dll-stats-plugin')
    , TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
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
    modules: ['local_modules','node_modules']
  },
  module: {
   rules: [
      {
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
    
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_vendor'      
    }),       
    new WriteDllStatsPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
