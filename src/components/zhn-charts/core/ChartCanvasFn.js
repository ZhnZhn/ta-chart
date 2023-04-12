import {
  extent as d3Extent
} from "d3-array";

import {
  functor,
  head,
  identity,
  isDefined,
  last,
  shallowEqual
} from "./utils";
import {
  getChartConfigWithUpdatedYScales,
  getNewChartConfig
} from "./utils/ChartDataUtil";
import evaluator from "./utils/evaluator";
import {
  CL_GRABBING_CURSOR,
  CL_CROSSHAIR_CURSOR,
  CL_DEFAULT_CURSOR,
  CL_MOVE_CURSOR,
  CL_POINTER_CURSOR,
  CL_NS_RESIZE_CURSOR,
  CL_EW_RESIZE_CURSOR,
  CL_TOOLTIP,
  CL_TOOLTIP_HOVER,
  CL_AVOID_INTERACTION,
  CL_ENABLE_INTERACTION
} from '../CL';

const CANDIDATES_FOR_RESET = ["seriesName"];
export const shouldResetChart = (
  thisProps,
  nextProps
) => !CANDIDATES_FOR_RESET
  .every(key => shallowEqual(thisProps[key], nextProps[key]));

/*
.${CL_CROSSHAIR_CURSOR} {
  pointer-events: all;
  cursor: crosshair;
}
*/
export const getCursorStyle = () => {
    const tooltipStyle = `
	.${CL_GRABBING_CURSOR} {
		pointer-events: all;
		cursor: -moz-grabbing;
		cursor: -webkit-grabbing;
		cursor: grabbing;
	}
	.${CL_CROSSHAIR_CURSOR} {
		pointer-events: all;
		cursor: arrow;
	}
	.${CL_TOOLTIP_HOVER} {
		pointer-events: all;
		cursor: pointer;
	}
	.${CL_AVOID_INTERACTION} {
		pointer-events: none;
	}
	.${CL_ENABLE_INTERACTION} {
		pointer-events: all;
	}
	.${CL_TOOLTIP} {
		pointer-events: all;
		cursor: pointer;
	}
	.${CL_DEFAULT_CURSOR} {
		cursor: default;
	}
	.${CL_MOVE_CURSOR} {
		cursor: move;
	}
	.${CL_POINTER_CURSOR} {
		cursor: pointer;
	}
	.${CL_NS_RESIZE_CURSOR} {
		cursor: ns-resize;
	}
	.${CL_EW_RESIZE_CURSOR} {
		cursor: ew-resize;
	}`;
    return <style type="text/css">{tooltipStyle}</style>;
};

export const getDimensions = ({
  margin : {top, bottom, left, right},
  height,
  width
}) => ({
   height: height - top - bottom,
   width: width - left - right
})

export const calculateFullData = (
  props
) => {
  const {
    data: fullData,
    plotFull,
    xScale,
    clamp,
    pointsPerPxThreshold,
    flipXScale,
    xAccessor,
    displayXAccessor,
    minPointsPerPxThreshold
  } = props
  , useWholeData = plotFull !== undefined
      ? plotFull
      : xAccessor === identity
  , {
    filterData
  } = evaluator({
      xScale,
      useWholeData,
      clamp,
      pointsPerPxThreshold,
      minPointsPerPxThreshold,
      flipXScale,
  });

  return {
    xAccessor,
    displayXAccessor: displayXAccessor ?? xAccessor,
    xScale: xScale.copy(),
    fullData,
    filterData
  };
};

const setXRange = (
  xScale,
  dimensions,
  padding,
  direction = 1
) => {
  if (xScale.rangeRoundPoints) {
    if (isNaN(padding)) {
      throw new Error("padding has to be a number for ordinal scale");
    }
    xScale.rangeRoundPoints([0, dimensions.width], padding);
  } else if (xScale.padding) {
    if (isNaN(padding)) {
      throw new Error("padding has to be a number for ordinal scale");
    }
    xScale.range([0, dimensions.width]);
    xScale.padding(padding / 2);
  } else {
     const {
       left,
       right
     } = isNaN(padding)
       ? padding
       : { left: padding, right: padding };
     if (direction > 0) {
       xScale.range([left, dimensions.width - right]);
     } else {
       xScale.range([dimensions.width - right, left]);
     }
  }
  return xScale;
};

const getXScaleDirection = (
  flipXScale
) => flipXScale ? -1 : 1

const calculateState = (
  props
) => {
   const {
     xAccessor: inputXAccesor,
     xExtents: xExtentsProp,
     data,
     padding,
     flipXScale
   } = props
   , direction = getXScaleDirection(flipXScale)
   , dimensions = getDimensions(props)
   , extent = typeof xExtentsProp === "function"
       ? xExtentsProp(data)
       : d3Extent(xExtentsProp.map((d) => functor(d)).map((each) => each(data, inputXAccesor)))
   , {
     xAccessor,
     displayXAccessor,
     xScale,
     fullData,
     filterData
   } = calculateFullData(props)
   , updatedXScale = setXRange(xScale, dimensions, padding, direction)
   , {
     plotData,
     domain
   } = filterData(fullData, extent, inputXAccesor, updatedXScale);

   return {
     plotData,
     xScale: updatedXScale.domain(domain),
     xAccessor,
     displayXAccessor,
     fullData,
     filterData,
   };
};

export const resetChart = (
  props
) => {
  const state = calculateState(props)
  , {
    xAccessor,
    displayXAccessor,
    fullData,
    plotData: initialPlotData,
    xScale
  } = state
  , {
    postCalculator,
    children
  } = props
  , plotData = postCalculator !== undefined
      ? postCalculator(initialPlotData)
      : initialPlotData
  , dimensions = getDimensions(props)
  , chartConfigs = getChartConfigWithUpdatedYScales(
      getNewChartConfig(dimensions, children), {
        plotData,
        xAccessor,
        displayXAccessor,
        fullData
      }, xScale.domain());

  return {
     ...state,
     xScale,
     plotData,
     chartConfigs,
  };
};

export const updateChart = (
  newState,
  initialXScale,
  props,
  lastItemWasVisible,
  initialChartConfig
) => {
  const {
    fullData,
    xScale,
    xAccessor,
    displayXAccessor,
    filterData
  } = newState
  , lastItem = last(fullData)
  , lastXItem = xAccessor(lastItem)
  , [
    start,
    end
  ] = initialXScale.domain()
  , {
    postCalculator,
    children,
    padding,
    flipXScale,
    maintainPointsPerPixelOnResize
  } = props
  , direction = getXScaleDirection(flipXScale)
  , dimensions = getDimensions(props)
  , updatedXScale = setXRange(
      xScale,
      dimensions,
      padding,
      direction
    );

  let initialPlotData;
  if (!lastItemWasVisible || end >= lastXItem) {
      // resize comes here...
      // get plotData between [start, end] and do not change the domain
      const [
        rangeStart,
        rangeEnd
      ] = initialXScale.range()
      , [
        newRangeStart,
        newRangeEnd
      ] = updatedXScale.range()
      , newDomainExtent = ((newRangeEnd - newRangeStart) / (rangeEnd - rangeStart)) * (end.valueOf() - start.valueOf())
      , newStart = maintainPointsPerPixelOnResize
          ? end.valueOf() - newDomainExtent
          : start
      , lastItemX = initialXScale(lastXItem)
      , response = filterData(fullData,
          [newStart, end],
          xAccessor,
          updatedXScale, {
          fallbackStart: start,
          fallbackEnd: { lastItem, lastItemX },
      });

      initialPlotData = response.plotData;
      updatedXScale.domain(response.domain);
  } else if (lastItemWasVisible && end < lastXItem) {
      // this is when a new item is added and last item was visible
      // so slide over and show the new item also
      // get plotData between [xAccessor(l) - (end - start), xAccessor(l)] and DO change the domain
      const dx = initialXScale(lastXItem) - initialXScale.range()[1]
      , [
        newStart,
        newEnd
      ] = initialXScale
          .range()
          .map((x) => x + dx)
          .map((x) => initialXScale.invert(x))
      , response = filterData(fullData,
          [newStart, newEnd],
          xAccessor,
          updatedXScale
        );

      initialPlotData = response.plotData;
      // if last item was visible, then shift
      updatedXScale.domain(response.domain);
  }
  const plotData = postCalculator(initialPlotData)
  , _newChartConfig = getNewChartConfig(
      dimensions,
      children,
      initialChartConfig
   )
  , chartConfigs = getChartConfigWithUpdatedYScales(
      _newChartConfig, {
        plotData,
        xAccessor,
        displayXAccessor,
        fullData
      },
      updatedXScale.domain());

  return {
      xScale: updatedXScale,
      xAccessor,
      chartConfigs,
      plotData,
      fullData,
      filterData,
  };
};

export const pinchCoordinates = ({
  touch1Pos,
  touch2Pos
}) => ({
   topLeft: [Math.min(touch1Pos[0], touch2Pos[0]), Math.min(touch1Pos[1], touch2Pos[1])],
   bottomRight: [Math.max(touch1Pos[0], touch2Pos[0]), Math.max(touch1Pos[1], touch2Pos[1])]
})

export const isInteractionEnabled = (
  xScale,
  xAccessor,
  data
) => !isNaN(xScale(xAccessor(head(data))))
  && isDefined(xScale.invert);
