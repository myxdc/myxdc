/**
 *  shows n of decimal places, adds commas for thousands, millions, etc
 * */
export const toHumanReadable = (num?: string | number, decimalPlaces = 2, intSep = ',', floatSep = '.') => {
  if (num === undefined) num = 0
  const numStr = num.toString()
  const [int, float] = numStr.split('.')
  const intStr = int.replace(/\B(?=(\d{3})+(?!\d))/g, intSep)
  if (float === undefined) return intStr
  const floatStr = float.slice(0, decimalPlaces).padEnd(decimalPlaces, '0')
  return `${intStr}${floatSep}${floatStr}`
}

/**
 *  adds k for thousands, M for millions, B for billions, T for trillions
 * */
export const toShortNumber = (num?: string | number, decimalPlaces = 2, intSep = ',', floatSep = '.') => {
  if (num === undefined) num = 0
  num = Number(num)
  if (num === undefined) num = 0
  if (num < 1e3) return num
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(decimalPlaces) + 'k'
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(decimalPlaces) + 'M'
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(decimalPlaces) + 'B'
  if (num >= 1e12) return +(num / 1e12).toFixed(decimalPlaces) + 'T'
  return num
}
