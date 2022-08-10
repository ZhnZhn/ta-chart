import PropTypes from 'prop-types';
import React from 'react';

import Axis from './Axis';
import {
  CL_Y_AXIS,
  CL_AXIS_DOMAIN,
  CL_NS_RESIZE_CURSOR,
  FONT_FAMILY
} from '../CL';

class YAxis extends React.Component {
    static defaultProps = {
        axisAt: "right",
        className: CL_Y_AXIS,
        domainClassName: CL_AXIS_DOMAIN,
        fontFamily: FONT_FAMILY,
        fontSize: 12,
        fontWeight: 400,
        getMouseDelta: (startXY, mouseXY) => startXY[1] - mouseXY[1],
        gridLinesStrokeStyle: "#e2e4ec",
        gridLinesStrokeWidth: 1,
        innerTickSize: 4,
        outerTickSize: 0,
        orient: "right",
        showDomain: true,
        showGridLines: false,
        showTicks: true,
        showTickLabel: true,
        strokeStyle: "#000000",
        strokeWidth: 1,
        tickPadding: 4,
        tickLabelFill: "#000000",
        tickStrokeStyle: "#000000",
        yZoomWidth: 40,
        zoomEnabled: true,
        zoomCursorClassName: CL_NS_RESIZE_CURSOR
    }

    static contextTypes = {
        yAxisZoom: PropTypes.func.isRequired,
        chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        chartConfig: PropTypes.object.isRequired,
    }

    axisZoomCallback = (newYDomain) => {
       const {
         chartId,
         yAxisZoom
       } = this.context;
       yAxisZoom(chartId, newYDomain);
    }

    helper = () => {
        const {
          axisAt,
          ticks,
          yZoomWidth,
          orient
        } = this.props
        , {
          chartConfig: { width, height }
        } = this.context
        , y = 0
        , w = yZoomWidth
        , h = height;
        let axisLocation;
        switch (axisAt) {
          case "left":
            axisLocation = 0;
            break;
          case "right":
            axisLocation = width;
            break;
          case "middle":
            axisLocation = width / 2;
            break;
          default:
            axisLocation = axisAt;
        }
        const x = orient === "left"
          ? -yZoomWidth
          : 0;
        return {
           transform: [axisLocation, 0],
           range: [0, height],
           getScale: this.getYScale,
           bg: { x, y, h, w },
           ticks: ticks ?? this.getYTicks(height),
           zoomEnabled: this.context.chartConfig.yPan,
        };
    }

    getYTicks = (height) => {
      if (height < 300) {
        return 2;
      }
      if (height < 500) {
        return 6;
      }
      return 8;
    }

    getYScale = (moreProps) => {
        const {
          yScale: scale,
          flipYScale,
          height
        } = moreProps.chartConfig;
        if (scale.invert) {
          const trueRange = flipYScale
            ? [0, height] : [height, 0]
          , trueDomain = trueRange.map(scale.invert);
          return scale
            .copy()
            .domain(trueDomain)
            .range(trueRange);
        }
        return scale;
    }

    render() {
        const {
          getMouseDelta,
          outerTickSize,
          strokeStyle,
          strokeWidth,
          ...restProps
        } = this.props
        , {
          zoomEnabled,
          ...moreProps
        } = this.helper();

        return (
          <Axis
            {...restProps}
            {...moreProps}
            edgeClip={true}
            getMouseDelta={getMouseDelta}
            outerTickSize={outerTickSize}
            strokeStyle={strokeStyle}
            strokeWidth={strokeWidth}
            zoomEnabled={this.props.zoomEnabled && zoomEnabled}
            axisZoomCallback={this.axisZoomCallback}
          />);
    }
}

export default YAxis
