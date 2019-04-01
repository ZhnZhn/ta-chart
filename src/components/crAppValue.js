
import DATA from './enumData'

const crAppValue = ({ dispatch, theme }) => ({
  theme,
  dataAction: {
    loading: () => dispatch({
      type: DATA.LOADING
    }),
    loadData: (payload) => dispatch({
      type: DATA.LOADED,
      ...payload
    }),
    loadFailed: () => dispatch({
      type: DATA.LOAD_FAILED
    })
  }
});


export default crAppValue
