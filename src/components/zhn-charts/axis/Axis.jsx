import React from "react";

import {
  getAxisCanvas
} from '../core/utils';

import {
  GenericChartComponent
} from '../core2/GenericChartComponent';

import { AxisZoomCapture } from "./AxisZoomCapture";

import {
  tickHelper,
  drawTicks,
  drawGridLine,
  drawEachTickLabel,
  drawAxisLine
} from './AxisFn';

const _crFont = ({
  fontWeight,
  fontSize,
  fontFamily
}) => `${fontWeight} ${fontSize}px ${fontFamily}`;

export class Axis extends React.Component {

    static defaultProps = {
        edgeClip: false,
        zoomEnabled: false,
        zoomCursorClassName: "",
    };

    chartRef = React.createRef();

    getMoreProps = () => this.chartRef
       .current.getMoreProps();

    drawOnCanvas = (ctx, moreProps) => {
        const {
          showDomain,
          showGridLines,
          showTickLabel,
          showTicks,
          transform,
          range,
          getScale,
          tickLabelFill
        } = this.props;

        ctx.save();
        ctx.translate(transform[0], transform[1]);

        const scale = getScale(moreProps)
        , tickProps = tickHelper(this.props, scale);

        if (showTicks) {
           drawTicks(ctx, tickProps);
        }

        if (showGridLines) {
           tickProps.ticks.forEach((tick) => {
             drawGridLine(ctx, tick, tickProps, moreProps);
           });
        }

        if (showTickLabel) {
            const {
              textAnchor
            } = tickProps;
            ctx.font = _crFont(tickProps);
            if (tickLabelFill !== undefined) {
               ctx.fillStyle = tickLabelFill;
            }
            ctx.textAlign = textAnchor === "middle"
               ? "center"
               : textAnchor;
            tickProps.ticks.forEach(tick => {
                drawEachTickLabel(ctx, tick, tickProps);
            });
        }

        if (showDomain) {
           drawAxisLine(ctx, this.props, range);
        }
        ctx.restore();
    }

    render() {
        const {
          bg,
          axisZoomCallback,
          className,
          zoomCursorClassName,
          zoomEnabled,
          getScale,
          inverted,
          transform,
          getMouseDelta,
          edgeClip,
          onContextMenu,
          onDoubleClick
        } = this.props;

        return (
          <g transform={`translate(${transform[0]}, ${transform[1]})`}>
              {zoomEnabled ? (<AxisZoomCapture
                 bg={bg}
                 getScale={getScale}
                 getMoreProps={this.getMoreProps}
                 getMouseDelta={getMouseDelta}
                 axisZoomCallback={axisZoomCallback}
                 className={className}
                 zoomCursorClassName={zoomCursorClassName}
                 inverted={inverted}
                 onContextMenu={onContextMenu}
                 onDoubleClick={onDoubleClick}/>
               ) : null
              }
              <GenericChartComponent
                 ref={this.chartRef}
                 canvasToDraw={getAxisCanvas}
                 clip={false}
                 edgeClip={edgeClip}
                 canvasDraw={this.drawOnCanvas}
                 drawOn={["pan"]}
              />
          </g>
        );
    }
}
