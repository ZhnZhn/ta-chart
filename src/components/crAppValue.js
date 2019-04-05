
import C from './config'
import DATA from './enumData'

import updateWs from './updateWs'

const crAppValue = ({
  appSettings,
  theme, setThemeId,
  dispatch,
  setLiveUpdating
}) => ({
  appSettings,
  theme,
  setThemeId,
  dataAction: {
    loading: () => dispatch({
      type: DATA.LOADING
    }),
    loadData: ({ timeframe=C.DF_TIMEFRAME, ...rest }) => {
      setLiveUpdating({ isLiveUpdating: false })
      updateWs.stopLiveUpdate()
      dispatch({
         type: DATA.LOADED,
         timeframe,
         ...rest
      })
    },
    loadFailed: () => dispatch({
      type: DATA.LOAD_FAILED
    })
  },
  onLiveUpdate: (pair) => {
    const onMessage = (point, second) => dispatch({
      type: DATA.UPDATE, point
    })
    , onOpen = () => setLiveUpdating({ isLiveUpdating: true })
    , onClose = () => setLiveUpdating({ isLiveUpdating: false })
    , onSecond = (sec) => setLiveUpdating({ isLiveUpdating: true, sec: sec })
    updateWs.startLiveUpdate({
      pair, onMessage, onOpen, onClose, onSecond
    })
  },
  onStopUpdate: () => {
    updateWs.stopLiveUpdate()
  }
});


export default crAppValue
