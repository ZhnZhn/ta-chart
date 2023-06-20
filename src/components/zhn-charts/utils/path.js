const _isArr = Array.isArray;

export const path = (
  loc = []
) => {
  const key = _isArr(loc)
    ? loc
    : [loc]
  , length = key.length;

  return (obj, defaultValue) => {
    if (length === 0) {
      return obj == null
        ? defaultValue
        : obj;
    }

    let index = 0;
    while (obj != null && index < length) {
      obj = obj[key[index++]];
    }
    return index === length
      ? obj
      : defaultValue;
    };
};
