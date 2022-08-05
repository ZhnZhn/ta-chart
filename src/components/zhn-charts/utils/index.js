import { scaleOrdinal } from  'd3-scale';

export { rebind } from './rebind';
export { default as merge } from './merge';
export { default as slidingWindow } from './slidingWindow';
export { default as zipper } from './zipper';
export { default as identity } from './identity';
export { path } from './path';
export { functor } from './functor';
export * from './strokeDasharray';

export { crCssTranslate } from './crCssTranslate';

const schemeCategory10 = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf"
];
//const defaultColors = ["#F44336", "#2196F3", "#8BC34A", "#FF5722", "#3F51B5", "#03A9F4", "#9C27B0", "#4CAF50"];

export const overlayColors = scaleOrdinal(schemeCategory10);

export const isDefined = d => d !== null
  && typeof d != "undefined"

export const isNotDefined = d => !isDefined(d)

export function find(list, predicate, context = this) {
	for (let i = 0; i < list.length; ++i) {
		if (predicate.call(context, list[i], i, list)) {
			return list[i];
		}
	}
	return;
}

export const hexToRGBA = (
  inputHex,
  opacity
) => {
	const hex = inputHex.replace("#", "");
	if (inputHex.indexOf("#") > -1 && (hex.length === 3 || hex.length === 6)) {
		const multiplier = hex.length === 3 ? 1 : 2
		, r = parseInt(hex.substring(0, 1 * multiplier), 16)
		, g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16)
		, b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16)

		, result = `rgba(${ r }, ${ g }, ${ b }, ${ opacity })`;

		return result;
	}
	return inputHex;
}

export const last = (
  array,
  accessor
) => {
    if (accessor && array) {
       let value;
       for (let i = array.length - 1; i >= 0; i--) {
          value = array[i];
          if (isDefined(accessor(value))) {
            return value;
          }
       }
       return;
    }
    const length = array ? array.length : 0;
    return length
      ? array[length - 1]
      : void 0;
}

//CandlestickSeries
export const head = (
  array,
  accessor
) => {
	if (accessor && array) {
		let value;
		for (let i = 0; i < array.length; i++) {
			value = array[i];
			if (isDefined(accessor(value))) {
        return value;
      }
		}
		return;
	}
	return array ? array[0] : void 0;
}

export const first = head

/**
 * Bar width is based on the amount of items in the plot data and the distance between the first and last of those
 * items.
 * @param props the props passed to the series.
 * @param moreProps an object holding the xScale, xAccessor and plotData.
 * @return {number} the bar width.
 */
export const plotDataLengthBarWidth = (
  props,
  moreProps
) => {
	const { widthRatio } = props
	, { xScale } = moreProps
	, [l, r] = xScale.range()
	, totalWidth = Math.abs(r - l);
  let width;
	if (xScale.invert != null) {
		const [dl, dr] = xScale.domain();
		width = totalWidth / Math.abs(dl - dr);
	} else {
		width = totalWidth / xScale.domain().length;
	}
  return width * widthRatio;
}
