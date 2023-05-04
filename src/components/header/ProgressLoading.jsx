import { memo } from '../uiApi';

import FETCH from '../enumFetch';
import ProgressLine from '../zhn/ProgressLine';

const  LOADING_COLOR = '#2f7ed8'
, FAILED_COLOR = '#ed5813'
, _crFetchState = (
  completed,
  color
) => [
  completed,
  color
];

const _getFetchingState = (
  fetchStatus
) => fetchStatus === FETCH.LOADING
  ? _crFetchState(35, LOADING_COLOR)
  : fetchStatus === FETCH.SUCCESS
     ? _crFetchState(100, LOADING_COLOR)
     : fetchStatus === FETCH.FAILED
         ? _crFetchState(100, FAILED_COLOR)
         : _crFetchState(0, LOADING_COLOR);

const ProgressLoading = ({
  fetchStatus
}) => {
  const [
    completed,
    color
  ] = _getFetchingState(fetchStatus);
  return (
    <ProgressLine
       color={color}
       completed={completed}
    />
  );
};

export default memo(ProgressLoading)
