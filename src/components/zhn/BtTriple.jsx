import { useState } from '../uiApi';

const CL_BT = 'bt-triple'
, CL_BT_ONE = 'bt-triple__one'
, CL_BT_TWO = 'bt-triple__two'
, CL_BT_THREE = 'bt-triple__three'

, S_SELECTED = { backgroundColor: '#1b2836' };

const _crBtStyle = (nowValue, btValue) => nowValue === btValue
  ? S_SELECTED
  : void 0;

const BtTriple = ({
  style,
  tabIndex=-1,
  initialValue=1,
  oneC='One',
  twoC='Two',
  threeC='Three',
  onClick
}) => {
  const [value, setValue] = useState(initialValue)
  , _oneStyle = _crBtStyle(value, 1)
  , _twoStyle = _crBtStyle(value, 2)
  , _threeStyle = _crBtStyle(value, 3)
  , _onClick = (value) => {
     onClick(value)
     setValue(value)
  };

  return (
  <div className={CL_BT} style={style}>
    <button
      className={CL_BT_ONE}
      style={_oneStyle}
      tabIndex={tabIndex}
      onClick={_onClick.bind(null, 1)}
    >
      {oneC}
    </button>
    <button
      className={CL_BT_TWO}
      style={_twoStyle}
      tabIndex={tabIndex}
      onClick={_onClick.bind(null, 2)}
    >
      {twoC}
    </button>
    <button
      className={CL_BT_THREE}
      style={_threeStyle}
      tabIndex={tabIndex}
      onClick={_onClick.bind(null, 3)}
    >
      {threeC}
    </button>
  </div>
  );
};

export default BtTriple
