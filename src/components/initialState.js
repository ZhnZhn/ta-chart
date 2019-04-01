
import FETCH from './enumFetch'
import C from './config'

const initialState = {
  providerTitle: C.INITIAL_PROVIDER_TITLE,
  itemTitle: C.INITIAL_ITEM_TITLE,
  data: C.DF_DATA,
  fetchStatus: FETCH.INITIAL
};

export default initialState
