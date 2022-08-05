import useEventCallback from '../../hooks/useEventCallback';

import { isNotDefined } from '../utils';
import { drawOnCanvas } from './EdgeCoordinateV3';

const useDrawOnCanvas = (
  props,
  helper
) => useEventCallback((ctx, moreProps) => {
  const _props = helper(props, moreProps);
  if (isNotDefined(_props)) {
    return null;
  }

  drawOnCanvas(ctx, _props);
})

export default useDrawOnCanvas
