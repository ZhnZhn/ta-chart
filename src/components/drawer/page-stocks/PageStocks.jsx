import React, { useContext } from 'react'

import AppValue from '../../contexts/AppValue'

import BackMenuBt from '../BackMenuBt'
import SelectWithLoad from '../../rows/SelectWithLoad'

import loadIex from './loadIex'

const S = {
  PAGE: {
    height: 400
  },
  /*
  TEXT: {
    color: '#1b2836',
    paddingLeft: 16,
    fontWeight: 600
  }
  */
};

const PageStocks = ({ style, onPrevPage }) => {
  const { loadData } = useContext(AppValue)
  , onSelect = (item) => {
    if (item) {
      loadIex(item.value, loadData)
    }
  };

  return (
    <div style={{...S.PAGE, ...style }}>
      <BackMenuBt onClick={onPrevPage} />
      <SelectWithLoad
        isShowLabels={false}
        placeholder="Symbol"
        optionURI="./data/stock-symbols.json"
        isWithInput={true}
        onSelect={onSelect}
      />
    </div>
  );
}

export default PageStocks
