import ChartCanvas from "react-stockcharts/lib/ChartCanvas"
import Chart from "react-stockcharts/lib/Chart"

import XAxis from "react-stockcharts/lib/axes/XAxis"
import YAxis from "react-stockcharts/lib/axes/YAxis"

import LineSeries from "react-stockcharts/lib/series/LineSeries"
import RSISeries from "react-stockcharts/lib/series/RSISeries"
import CandlestickSeries from "react-stockcharts/lib/series/CandlestickSeries"
import BollingerSeries from "react-stockcharts/lib/series/BollingerSeries"
import BarSeries from "react-stockcharts/lib/series/BarSeries"

//import CrossHairCursor from "react-stockcharts/lib/coordinates/CrossHairCursor";
import CrossHairCursor from "../zhn-charts/coordinates/CrossHairCursor";
import MouseCoordinateX from "react-stockcharts/lib/coordinates/MouseCoordinateX"
import MouseCoordinateY from "react-stockcharts/lib/coordinates/MouseCoordinateY"

import RSITooltip from "react-stockcharts/lib/tooltip/RSITooltip"
import OHLCTooltip from "react-stockcharts/lib/tooltip/OHLCTooltip"
import MovingAverageTooltip from "react-stockcharts/lib/tooltip/MovingAverageTooltip"
import BollingerBandTooltip from "react-stockcharts/lib/tooltip/BollingerBandTooltip"

import sma from "../zhn-charts/indicator/sma"
import rsi from "../zhn-charts/indicator/rsi"
import bollingerBand from "../zhn-charts/indicator/bollingerBand"
import useElementWidth from '../zhn-charts/hooks/useElementWidth'

const Ch = {
  ChartCanvas,
  Chart,

  XAxis,
  YAxis,

  LineSeries,
  RSISeries,
  CandlestickSeries,
  BollingerSeries,
  BarSeries,

  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,

  RSITooltip,
  OHLCTooltip,
  MovingAverageTooltip,
  BollingerBandTooltip,

  sma,
  rsi,
  bollingerBand,
  useElementWidth
};

export default Ch
