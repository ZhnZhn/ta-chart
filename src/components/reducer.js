
const _isDataValid = data => Array.isArray(data)
 || data.length>20;

const reducer = (state, action) => {
  switch(action.type){
    case "DATA_LOADED":{
      const { data } = action;
      if ( !_isDataValid(data) ) {
        return state;
      }
      return {
        ...state,
        data: action.data,
        providerTitle: action.providerTitle,
        itemTitle: action.itemTitle
      };
    }
    default: throw new Error();
  }
}

export default reducer
