import { useMemo } from '../../uiApi';

import {
  timeIntervalBarWidth
} from '../chartFns';

const useTimeIntervalBarWidth = (
  timeInterval
) => useMemo(
  () => timeIntervalBarWidth(timeInterval),
  [timeInterval]
);

export default useTimeIntervalBarWidth
