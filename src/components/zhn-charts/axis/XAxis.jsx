import PropTypes from 'prop-types';
import React from 'react';

import { Axis } from './Axis';
import {
  CL_X_AXIS,
  CL_AXIS_DOMAIN,
  CL_EW_RESIZE_CURSOR,
  FONT_FAMILY
} from '../CL';

class XAxis extends React.Component {
    static defaultProps = {
       axisAt: "bottom",
       className: CL_X_AXIS,
       domainClassName: CL_AXIS_DOMAIN,
       fontFamily: FONT_FAMILY,
       fontSize: 12,
       fontWeight: 400,
       getMouseDelta: (startXY, mouseXY) => startXY[0] - mouseXY[0],
       gridLinesStrokeStyle: "#e2e4ec",
       gridLinesStrokeWidth: 1,
       orient: "bottom",
       outerTickSize: 0,
       innerTickSize: 4,
       showDomain: true,
       showGridLines: false,
       showTicks: true,
       showTickLabel: true,
       strokeStyle: "#000000",
       strokeWidth: 1,
       tickPadding: 4,
       tickLabelFill: "#000000",
       tickStrokeStyle: "#000000",
       xZoomHeight: 25,
       zoomEnabled: true,
       zoomCursorClassName: CL_EW_RESIZE_CURSOR
    }

    static contextTypes = {
       chartConfig: PropTypes.object.isRequired,
       xAxisZoom: PropTypes.func.isRequired,
    }

    axisZoomCallback = (newXDomain) => {
       const { xAxisZoom } = this.context;
       xAxisZoom(newXDomain);
    }

    helper = () => {
        const {
          axisAt,
          xZoomHeight,
          orient,
          ticks
        } = this.props
        , {
          chartConfig: { width, height }
        } = this.context
        , x = 0
        , w = width
        , h = xZoomHeight;
        let axisLocation;
        switch (axisAt) {
          case "top":
            axisLocation = 0;
            break;
          case "bottom":
            axisLocation = height;
            break;
          case "middle":
            axisLocation = height / 2;
            break;
          default:
            axisLocation = axisAt;
        }
        const y = orient === "top"
          ? -xZoomHeight
          : 0;
        return {
          transform: [0, axisLocation],
          range: [0, width],
          getScale: this.getXScale,
          bg: { x, y, h, w },
          ticks: ticks ?? this.getXTicks(width),
        };
    }

    getXTicks = (width) => {
        if (width < 400) {
          return 2;
        }
        if (width < 500) {
          return 6;
        }
        return 8;
    }

    getXScale = (moreProps) => {
        const {
          xScale: scale,
          width
        } = moreProps;
        if (scale.invert) {
           const trueRange = [0, width]
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
          showTicks,
          strokeStyle,
          strokeWidth,
          zoomEnabled,
          ...restProps
        } = this.props
        , {
          ...moreProps
        } = this.helper();

        return (
          <Axis
            {...restProps}
            {...moreProps}
            getMouseDelta={getMouseDelta}
            outerTickSize={outerTickSize}
            showTicks={showTicks}
            strokeStyle={strokeStyle}
            strokeWidth={strokeWidth}
            zoomEnabled={zoomEnabled && showTicks}
            axisZoomCallback={this.axisZoomCallback}
        />);
    }
}

export default XAxis
