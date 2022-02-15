
const _isArr = Array.isArray;

export const getItems = (json, propName) => {
  const _items = propName
    ? (json || {})[propName]
    : json;
  return _isArr(_items)
    ? _items
    : [];
}

export const compareByCaption = (a, b) => {
   if (a.caption < b.caption) {
     return -1;
   } else if (a.caption > b.caption) {
     return 1;
   } else {
     return 0;
   }
}

export const isObj = obj => typeof obj === 'object'
