import React, { useContext } from 'react'

import AppLiveUpdating from '../contexts/AppLiveUpdating'

const S = {
  BT_LOADING: {
    position: 'relative',
    top: 6,
    left: 8,
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  SEC: {
    color: '#80c040',
    display: 'inline-block',
    paddingLeft: 6,
    fontSize: 16,
    fontWeight: 'bold'
  }
};

const LiveUpdatingBt = ({
  spinnerCn,
  onStopUpdate
}) => {
  const { isLiveUpdating, sec} = useContext(AppLiveUpdating);
  return (
    isLiveUpdating && <button
       style={S.BT_LOADING}
       onClick={onStopUpdate}>
        <span
          className={spinnerCn}
          data-loader="circle"
        />
        <span style={S.SEC}>{sec}</span>
      </button>
  );
};

export default LiveUpdatingBt
