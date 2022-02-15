import { useContext } from '../uiApi';

import AppLiveUpdating from '../contexts/AppLiveUpdating';

const S_BT_LOADING = {
  position: 'relative',
  top: 6,
  left: 8,
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer'
}
, S_SEC = {
  color: '#80c040',
  display: 'inline-block',
  paddingLeft: 6,
  fontSize: 16,
  fontWeight: 'bold'
};

const LiveUpdatingBt = ({
  spinnerCn,
  onStopUpdate
}) => {
  const { isLiveUpdating, sec } = useContext(AppLiveUpdating);
  return (
    isLiveUpdating && <button
       style={S_BT_LOADING}
       onClick={onStopUpdate}>
        <span
          className={spinnerCn}
          data-loader="circle"
        />
        <span style={S_SEC}>{sec}</span>
      </button>
  );
};

export default LiveUpdatingBt
