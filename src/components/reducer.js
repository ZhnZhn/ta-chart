import FETCH from './enumFetch'
import DATA from './enumData'

const _isDataValid = data => Array.isArray(data)
 || data.length>20;

const reducer = (state, action) => {
  switch(action.type){
    case DATA.LOADING:
     return {
       ...state,
       fetchStatus: FETCH.LOADING
     };
    case DATA.LOADED: {
      const { data } = action;
      if ( !_isDataValid(data) ) {
        return state;
      }
      return {
        ...state,
        data: action.data,
        providerTitle: action.providerTitle,
        itemTitle: action.itemTitle,
        timeframe: action.timeframe,
        fetchStatus: FETCH.SUCCESS
      };
    }
    case DATA.LOAD_FAILED:
      return {
        ...state,
        fetchStatus: FETCH.FAILED
      };
    default: throw new TypeError('Not existed action', action.type);
  }
}

export default reducer
