import React from 'react'

import FlatButton from '../zhn-m/FlatButton'

const CL = {
  BT: 'drawer__list-bt'
};

const S = {
  UL: {
    listStyleType: 'none'
  }
};

const PageMenu = ({ style, onNextPage }) => (
  <ul style={{...S.UL, ...style }}>
    <li>
      <FlatButton
        className={CL.BT}
        caption="App Settings"
        onClick={() => onNextPage("p1-1")}
      />
    </li>
    <li>
      <FlatButton
        className={CL.BT}
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
