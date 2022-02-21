import {
  useState,
  useReducer
} from './uiApi';

import useInit from './hooks/useInit'

import AppValue from './contexts/AppValue'
import AppThemeId from './contexts/AppThemeId'
import AppLiveUpdating from './contexts/AppLiveUpdating'

import appSettings from './appSettings'
import theme from './styles/theme'

import Header from './header/Header'
import HollowChart  from './charts/HollowChart'

import initialState from './initialState'
import reducer from './reducer'
import crAppValue from './crAppValue'

const HOLLOW_EL_ID = "chart_wrapper"
, S_MAIN = { paddingTop: 8 }
, INITIAL_UPDATING_STATE = {
  isLiveUpdating: false,
  sec: ''
};

const App = () => {
  const [themeId, setThemeId] = useState(1)
  , [state, dispatch] = useReducer(reducer, initialState)
  , {
      providerTitle,
      itemTitle,
      data,
      timeframe,
      fetchStatus
    } = state
  , [liveUpdating, setLiveUpdating] = useState(INITIAL_UPDATING_STATE)
  , appValue = useInit(() => crAppValue({
      appSettings,
      theme,
      setThemeId,
      dispatch,
      setLiveUpdating
  }));


  return (
    <AppValue.Provider value={appValue}>
    <AppThemeId.Provider value={themeId}>
    <AppLiveUpdating.Provider value={liveUpdating}>
      <Header
        fetchStatus={fetchStatus}
        providerTitle={providerTitle}
        itemTitle={itemTitle}
        timeframe={timeframe}
      />
      <main style={S_MAIN}>
        <HollowChart
          id={HOLLOW_EL_ID}
          height={550}
          data={data}
          timeframe={timeframe}
        />
      </main>
    </AppLiveUpdating.Provider>
    </AppThemeId.Provider>
    </AppValue.Provider>
   )
};

export default App
