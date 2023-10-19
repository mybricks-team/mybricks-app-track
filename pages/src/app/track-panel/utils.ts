const UUID_CHARS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

export function uuid(len = 8, radix = 8) {
  const uuid = []

  if (len) {
    for (let i = 0; i < len; i++) {
      uuid[i] = UUID_CHARS[0 | (Math.random() * radix)]
    }
  } else {
    let r

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = UUID_CHARS[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

export function deepCopy(obj: any, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit: any = cache.filter((c: any) => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }
  const copy: any = Array.isArray(obj) ? [] : {}

  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

export function safeDecodeURIComponent(uri: any) {
  try {
    let result = decodeURIComponent(uri);
    return result;
  } catch (e) {
    console.error("safeDecodeURIComponent", uri, e);
    return uri;
  }
}

export function isValid(val: any) {
  return val !== null && val !== undefined;
}