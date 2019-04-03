
import C from './config'
import DATA from './enumData'

const crAppValue = ({ dispatch, theme }) => ({
  theme,
  dataAction: {
    loading: () => dispatch({
      type: DATA.LOADING
    }),
    loadData: ({ timeframe=C.DF_TIMEFRAME, ...rest }) => dispatch({
      type: DATA.LOADED,
      timeframe,
      ...rest
    }),
    loadFailed: () => dispatch({
      type: DATA.LOAD_FAILED
    })
  }
});


export default crAppValue
