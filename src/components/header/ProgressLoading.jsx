import { memo } from '../uiApi';

import FETCH from '../enumFetch';
import ProgressLine from '../zhn/ProgressLine';

const  LOADING_COLOR = '#2f7ed8'
, FAILED_COLOR = '#ed5813'
, _crFetchState = (completed, color) => [
  completed,
  color
];

const _getFetchingState = (fetchStatus) => {
  if (fetchStatus === FETCH.LOADING) {
    return _crFetchState(35, LOADING_COLOR);
  } else if (fetchStatus === FETCH.SUCCESS) {
    return _crFetchState(100, LOADING_COLOR);
  } else if (fetchStatus === FETCH.FAILED) {
    return _crFetchState(100, FAILED_COLOR);
  } else {
    return _crFetchState(0, LOADING_COLOR);
  }
};

const ProgressLoading = ({
  fetchStatus
}) => {
  const [
    completed,
    color
  ] = _getFetchingState(fetchStatus);
  return (
    <ProgressLine
       height={3}
       color={color}
       completed={completed}
    />
  );
};

export default memo(ProgressLoading)
