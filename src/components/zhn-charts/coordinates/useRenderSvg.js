import useEventCallback from '../../hooks/useEventCallback';

import { isNotDefined } from '../utils';
import { renderSVG } from './EdgeCoordinateV3';

const useRenderSvg = (
  props,
  helper
) => useEventCallback(moreProps => {
  const _props = helper(props, moreProps);    
  return isNotDefined(_props)
    ? null
    : renderSVG(_props);
})

export default useRenderSvg
