import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import timeIntervalBarWidth from './utils/timeIntervalBarWidth'

import config from './config'

const chartFns = {
  C: config,
  timeIntervalBarWidth,

  scaleTime,
  utcDay,
  format,
  timeFormat
};

export default chartFns
