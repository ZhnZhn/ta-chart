
const _isArr = Array.isArray;

export const getItems = (json, propName) => {
  const _items = propName
    ? (json || {})[propName]
    : json;
  return _isArr(_items)
    ? _items
    : [];
}

export const isObj = obj => typeof obj === 'object'
