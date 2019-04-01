import React, { useState, useReducer, useEffect } from 'react'

import useInit from './hooks/useInit'

import AppValue from './contexts/AppValue'
import AppThemeId from './contexts/AppThemeId'

import theme from './styles/theme'

import Header from './header/Header'
import HollowChart  from './charts/HollowChart'

import initialState from './initialState'
import reducer from './reducer'
import crAppValue from './crAppValue'

const S = {
  MAIN: {
    paddingTop: 8
  },
  INLINE: {
    display: 'inline-block'
  },
  SELECTS: {
    display: 'inline-block',
    verticalAlign: 'top'
  }
};

const EL_ID = "chart_wrapper";

const App = () => {
  const [width, setWidth] = useState(900)
  , [themeId, setThemeId] = useState(1)
  , [state, dispatch] = useReducer(reducer, initialState)
  , {
    providerTitle, itemTitle,
    data, fetchStatus
  } = state
  , appValue = useInit(() => crAppValue({
       dispatch, theme
  }));


  const hResize = () => {
    const _el = document.getElementById(EL_ID)
    , _style = window.getComputedStyle(_el)
    , _w = Math.round(parseFloat(_style.width));
    setWidth(_w)
  };
  useEffect(()=>{
     window.addEventListener("resize", hResize);
     return () => window.removeEventListener("resize", hResize);
  }, [])

  /*
  console.log(JSON.stringify(data.map(obj => ({
    date: obj.date,
    open: obj.open,
    high: obj.high,
    low: obj.low,
    close: obj.close,
    volume: obj.volume
  }))))
  */


  return (
    <AppValue.Provider value={appValue}>
    <AppThemeId.Provider value={themeId}>
      <Header
        setThemeId={setThemeId}
        fetchStatus={fetchStatus}
        providerTitle={providerTitle}
        itemTitle={itemTitle}
      />
      <main style={S.MAIN}>
        <HollowChart
          id={EL_ID}
          width={width}
          height={550}
          data={data}
          resize={hResize}
        />
      </main>
    </AppThemeId.Provider>
    </AppValue.Provider>
   )
};

export default App
