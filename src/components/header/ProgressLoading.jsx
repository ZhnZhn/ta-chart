import { PureComponent } from 'react'

import FETCH from '../enumFetch';
import ProgressLine from '../zhn/ProgressLine';

const C = {
  LOADING : '#2f7ed8',
  FAILED : 'rgb(237, 88, 19)'
};

const _getFetchingState = (fetchStatus) => {
  switch (fetchStatus) {
  case FETCH.LOADING:
    return { completed: 35, color: C.LOADING };
  case FETCH.SUCCESS:
    return { completed: 100, color: C.LOADING };
  case FETCH.FAILED:
    return { completed: 100, color: C.FAILED };
  default:
    return { completed : 0, color : C.LOADING };
  }
};

class ProgressLoading extends PureComponent {
  render(){
    const { fetchStatus } = this.props
    , {
      completed, color
    } = _getFetchingState(fetchStatus);
    return (
      <ProgressLine
         height={3}
         color={color}
         completed={completed}
      />
    );
  }
}

export default ProgressLoading
