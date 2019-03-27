
export const crPoint = p => ({
  date: p[0],
  open: p[1],
  high: p[2],
  low: p[3],
  close: p[4],
  volume: p[5]
})

export const crOptionItem = str => ({
  caption: str,
  value: str
})
