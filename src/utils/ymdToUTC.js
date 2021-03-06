
const ymdToUTC = date => {
  const _arr = date.split('-')
      , _len = _arr.length;
  if (_len === 3) {
    return Date.UTC( _arr[0], (parseInt(_arr[1], 10)-1), _arr[2] );
  } else if ( _len === 2 && _arr[1] !== ''){
    const _m = parseInt(_arr[1], 10)
        , _d = (new Date(_arr[0], _m, 0)).getDate();
    return Date.UTC( _arr[0], _m - 1, _d );
  } else if ( _len === 1) {
    return Date.UTC( _arr[0], 11, 31 );
  }
}

export default ymdToUTC
