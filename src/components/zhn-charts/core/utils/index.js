export { default as zipper } from '../../utils/zipper';
export { default as slidingWindow } from '../../utils/slidingWindow';
export { default as identity } from '../../utils/identity';
export { path } from '../../utils/path';
export { functor } from '../../utils/functor';
export * from '../../utils/strokeDasharray';
export {
  head,
  first,
  last
} from '../../utils';
export * from "./closestItem";
export * from "./noop";
export * from "./shallowEqual";
export * from "./PureComponent";

const _isArr = Array.isArray

export const sign = (
  x
) => (x > 0) - (x < 0);

export const getClosestValue = (
  inputValue,
  currentValue
) => {
  const values = _isArr(inputValue)
    ? inputValue
    : [inputValue]
  , diff = values
      .map((each) => each - currentValue)
      .reduce((diff1, diff2) => (Math.abs(diff1) < Math.abs(diff2) ? diff1 : diff2));
  return currentValue + diff;
}

export const d3Window = (
  node
) => node
  && (
    (node.ownerDocument && node.ownerDocument.defaultView)
    || (node.document && node)
    || node.defaultView
  );

export const MOUSEENTER = "mouseenter.interaction";
export const MOUSELEAVE = "mouseleave.interaction";
export const MOUSEMOVE = "mousemove.pan";
export const MOUSEUP = "mouseup.pan";
export const TOUCHMOVE = "touchmove.pan";
export const TOUCHEND = "touchend.pan touchcancel.pan";

export const getTouchProps = (
  touch
) => ({
  pageX: touch.pageX,
  pageY: touch.pageY,
  clientX: touch.clientX,
  clientY: touch.clientY,
})

export const isObject = (
  d
) => d
  && typeof d === "object"
  && !_isArr(d);

const _crPosition = (
  eventOrTouchProps,
  rect,
  container
) => [
  Math.round(eventOrTouchProps.clientX - rect.left - container.clientLeft),
  Math.round(eventOrTouchProps.clientY - rect.top - container.clientTop)
];

export const touchPosition = (
  touch,
  e
) => {
  const container = e.currentTarget
  , rect = container.getBoundingClientRect()
  return _crPosition(touch,rect, container);
}

export const mousePosition = (
  e,
  defaultRect
) => {
  const container = e.currentTarget
  , rect = defaultRect ?? container.getBoundingClientRect();
  return _crPosition(e, rect, container);
}

export const clearCanvas = (
  canvasList,
  ratio
) => {
  canvasList.forEach(each => {
    each.setTransform(1, 0, 0, 1, 0, 0);
    each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
    each.scale(ratio, ratio);
  });
}

// copied from https://github.com/lodash/lodash/blob/master/mapObject.js
export const mapObject = (
  object = {},
  iteratee = (x) => x
) => {
  const props = Object.keys(object)
  , result = new Array(props.length);
  props.forEach((key, index) => {
    result[index] = iteratee(object[key], key, object);
  });
  return result;
}
