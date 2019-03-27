const BG = {
  '1': '#5f5f5f',
  '2': '#e1e1e1',
  '3': '#e8e0cb'
};
const HEADER = {
  '1': {},
  '2': { backgroundColor: '#d4d4d4' },
  '3': { backgroundColor: '#e8dcbe' }
};

const theme = {
  getBgColor: value => BG[''+value],
  getHeaderStyle: value => HEADER[''+value],
  getDrawerStyle: value => HEADER[''+value]
}

export default theme
