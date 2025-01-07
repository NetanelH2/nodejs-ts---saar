import purify from './sanitize'

export const sanitizeDataRequest = (data) => {
  if (typeof data === 'string') {
    return purify.sanitize(data)
  }
  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach(
      (key) => (data[key] = sanitizeDataRequest(data[key])),
    )
  }
  return data
}
