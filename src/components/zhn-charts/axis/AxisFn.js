import {
  range as d3Range,
  zip
} from '../d3Array';

import {
  forceCollide,
  forceSimulation,
  forceX
} from 'd3-force';

import {
  getStrokeDasharrayCanvas,
  first,
  last
} from '../utils';

const drawEachTick = (
  ctx,
  tick,
  result
) => {
    const {
      tickStrokeWidth,
      tickStrokeDasharray
    } = result;

    ctx.beginPath();
    ctx.moveTo(tick.x1, tick.y1);
    ctx.lineTo(tick.x2, tick.y2);
    ctx.lineWidth = tickStrokeWidth;

    const lineDash = getStrokeDasharrayCanvas(tickStrokeDasharray);
    ctx.setLineDash(lineDash);
    ctx.stroke();
};

export const tickHelper = (
  props,
  scale
) => {
    const {
      orient,
      innerTickSize = 4,
      tickFormat,
      tickPadding = 4,
      tickLabelFill,
      tickStrokeWidth,
      tickStrokeDasharray,
      fontSize = 12,
      fontFamily,
      fontWeight,
      showTicks,
      showTickLabel,
      ticks: tickArguments,
      tickValues: tickValuesProp,
      tickStrokeStyle,
      tickInterval,
      tickIntervalFunction,
      ...rest
    } = props;

    let tickValues;
    if (tickValuesProp !== undefined) {
        if (typeof tickValuesProp === "function") {
          tickValues = tickValuesProp(scale.domain());
        } else {
          tickValues = tickValuesProp;
        }
    } else if (tickInterval !== undefined) {
        const [min, max] = scale.domain()
        , baseTickValues = d3Range(min, max, (max - min) / tickInterval);

        tickValues = tickIntervalFunction ? tickIntervalFunction(min, max, tickInterval) : baseTickValues;
    } else if (scale.ticks !== undefined) {
        tickValues = scale.ticks(tickArguments);
    } else {
        tickValues = scale.domain();
    }

    const format = tickFormat === undefined
       ? scale.tickFormat(tickArguments)
       : (d) => tickFormat(d) || ""
    , sign = orient === "top" || orient === "left"
       ? -1
       : 1
    , tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

    let ticks
    , dy
    , canvas_dy
    , textAnchor;

    if (orient === "bottom" || orient === "top") {
        const y2 = sign * innerTickSize
        , labelY = sign * tickSpacing;

        dy = sign < 0 ? "0em" : ".71em";
        canvas_dy = sign < 0 ? 0 : fontSize * 0.71;
        textAnchor = "middle";

        ticks = tickValues.map((d) => {
            const x = Math.round(scale(d));
            return {
                value: d,
                x1: x,
                y1: 0,
                x2: x,
                y2,
                labelX: x,
                labelY,
            };
        });
        if (showTicks) {
            const nodes = ticks.map(d => ({
              id: d.value,
              value: d.value,
              fy: d.y2,
              origX: d.x1
            }))
            , simulation = forceSimulation(nodes)
                .force("x", forceX((d) => d.origX).strength(1))
                .force("collide", forceCollide(22))
                .stop();
            for (let i = 0; i < 100; ++i) {
                simulation.tick();
            }
            ticks = zip(ticks, nodes).map((d) => {
                const [a, b] = d;
                if (Math.abs(b.x - b.origX) > 0.01) {
                    return {
                        ...a,
                        x2: b.x,
                        labelX: b.x,
                    };
                }
                return a;
            });
        }
    } else {
        ticks = tickValues.map(d => {
            const y = Math.round(scale(d));
            return {
                value: d,
                x1: 0,
                y1: y,
                x2: sign * innerTickSize,
                y2: y,
                labelX: sign * tickSpacing,
                labelY: y,
            };
        });
        dy = ".32em";
        canvas_dy = fontSize * 0.32;
        textAnchor = sign < 0 ? "end" : "start";
    }

    return {
        orient,
        ticks,
        scale,
        tickStrokeStyle,
        tickLabelFill: tickLabelFill || tickStrokeStyle,
        tickStrokeWidth,
        tickStrokeDasharray,
        dy,
        canvas_dy,
        textAnchor,
        fontSize,
        fontFamily,
        fontWeight,
        format,
        showTickLabel,
        ...rest,
    };
};

export const drawAxisLine = (
  ctx,
  props
) => {
    const {
      orient,
      outerTickSize,
      strokeStyle,
      strokeWidth,
      range
    } = props
    , sign = orient === "top" || orient === "left"
       ? -1
       : 1
    , xAxis = orient === "bottom" || orient === "top";

    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();

    const firstPoint = first(range)
    , lastPoint = last(range)
    , tickSize = sign * outerTickSize;
    if (xAxis) {
        ctx.moveTo(firstPoint, tickSize);
        ctx.lineTo(firstPoint, 0);
        ctx.lineTo(lastPoint, 0);
        ctx.lineTo(lastPoint, tickSize);
    } else {
        ctx.moveTo(tickSize, firstPoint);
        ctx.lineTo(0, firstPoint);
        ctx.lineTo(0, lastPoint);
        ctx.lineTo(tickSize, lastPoint);
    }
    ctx.stroke();
};

export const drawTicks = (
  ctx,
  result
) => {
    const {
      ticks,
      tickStrokeStyle
    } = result;
    if (tickStrokeStyle !== undefined) {
        ctx.strokeStyle = tickStrokeStyle;
        ctx.fillStyle = tickStrokeStyle;
    }
    ticks.forEach((tick) => {
        drawEachTick(ctx, tick, result);
    });
};

const _drawGridLine = (
  ctx,
  tick,
  result,
  moreProps
) => {
    const {
      orient,
      gridLinesStrokeWidth,
      gridLinesStrokeStyle,
      gridLinesStrokeDasharray
    } = result
    , {
      chartConfig
    } = moreProps
    , {
      height,
      width
    } = chartConfig;

    if (gridLinesStrokeStyle !== undefined) {
        ctx.strokeStyle = gridLinesStrokeStyle;
    }
    ctx.beginPath();
    const sign = orient === "top" || orient === "left"
      ? 1
      : -1;
    switch (orient) {
      case "top": case "bottom":
        ctx.moveTo(tick.x1, 0);
        ctx.lineTo(tick.x2, sign * height);
        break;
      default:
        ctx.moveTo(0, tick.y1);
        ctx.lineTo(sign * width, tick.y2);
        break;
    }

    ctx.lineWidth = gridLinesStrokeWidth;
    const lineDash = getStrokeDasharrayCanvas(gridLinesStrokeDasharray);
    ctx.setLineDash(lineDash);
    ctx.stroke();
};

export const drawGridLines = (
  ctx,
  tickProps,
  moreProps
) => {
  tickProps.ticks.forEach(tick => {
    _drawGridLine(ctx, tick, tickProps, moreProps);
  });
}

const _drawEachTickLabel = (
  ctx,
  tick,
  result
) => {
    const {
      canvas_dy,
      format
    } = result
    , text = format(tick.value);

    ctx.beginPath();
    ctx.fillText(text, tick.labelX, tick.labelY + canvas_dy);
};

const _crFont = ({
  fontWeight,
  fontSize,
  fontFamily
}) => `${fontWeight} ${fontSize}px ${fontFamily}`;

export const drawTickLabels = (
  ctx, tickProps
) => {
  const {
    textAnchor,
    tickLabelFill
  } = tickProps;

  ctx.font = _crFont(tickProps);
  if (tickLabelFill !== undefined) {
    ctx.fillStyle = tickLabelFill;
  }
  ctx.textAlign = textAnchor === 'middle'
    ? 'center'
    : textAnchor;

  tickProps.ticks.forEach(tick => {
    _drawEachTickLabel(ctx, tick, tickProps);
  });
}

export const crScale = (
  scale,
  trueRange
) => {
  const trueDomain = trueRange.map(scale.invert);
  return scale
    .copy()
    .domain(trueDomain)
    .range(trueRange);
}
