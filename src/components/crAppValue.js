
const crAppValue = ({ dispatch, theme }) => ({
  theme,
  loadData: (payload) => dispatch({
    type: "DATA_LOADED",
    ...payload
  })
});


export default crAppValue
