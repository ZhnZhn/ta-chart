import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  getRefValue
} from '../../uiApi';

export const useElementWidth = ({
  id,
  minWidth=100,
  initialWidth=1000
} = {}) => {
  const ref = useRef()
  , [
    width,
    setWidth
  ] = useState(initialWidth)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _calcWidth = useCallback(() => {
    const _el = id
      ? document.getElementById(id)
      : getRefValue(ref);
    if (_el) {
      const {
        width,
        paddingLeft,
        paddingRight
      } = window.getComputedStyle(_el)
      , w = parseFloat(width) - (parseFloat(paddingLeft) + parseFloat(paddingRight));

      setWidth(Math.round(Math.max(w, minWidth)));
    }
  }, [])
  // id, minWidth

  useLayoutEffect(_calcWidth, [])
  // _calcWidth

  useEffect(() => {
    window.addEventListener('resize', _calcWidth)
    return () => window.removeEventListener('resize', _calcWidth);
  }, [])
  // _calcWidth
  /*eslint-enable react-hooks/exhaustive-deps */

  return [width, ref];
};
