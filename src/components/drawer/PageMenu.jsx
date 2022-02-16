import FlatButton from '../zhn-m/FlatButton';

const CL_LIST_BT = 'drawer__list-bt'
, S_UL = { listStyleType: 'none' };

const PageMenu = ({
  style,
  onNextPage
}) => (
  <ul style={{...S_UL, ...style}}>    
    <li>
      <FlatButton
        className={CL_LIST_BT}
        caption="App Settings"
        onClick={() => onNextPage("p1-1")}
      />
    </li>
    <li>
      <FlatButton
        className={CL_LIST_BT}
        caption="AltCoins"
        onClick={() => onNextPage("p1-2")}
      />
    </li>
    {/*
    <li>
      <FlatButton
        className={CL.BT}
        caption="Stocks"
        onClick={() => onNextPage("p1-3")}
      />
    </li>
    */}
  </ul>
);

export default PageMenu
