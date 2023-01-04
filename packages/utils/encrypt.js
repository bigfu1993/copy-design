import { SM2, SM3, SM4 } from 'gm-crypto'

export const SM4_KEY = 'nIvRBlKAioFvZchU'
export const SM4_IV = 'HShSNyNZsH8wEzaU'

const { publicKey, privateKey } = SM2.generateKeyPair()
// SM2加密
export function sm2Encrypt(data, options = {}) {
  return SM2.encrypt(data, publicKey, {
    mode: SM2.constants.C1C3C2, // C1C3C2 | C1C2C3
    inputEncoding: 'utf8',
    outputEncoding: 'base64',
  })
}
// SM2解密
export function sm2Decrypt(data, options = {}) {
  return SM2.decrypt(data, privateKey, {
    mode: SM2.constants.C1C3C2, // C1C3C2 | C1C2C3
    inputEncoding: 'base64',
    outputEncoding: 'utf8',
  })
}
// SM3加密
// eslint-disable-next-line no-undef
export function sm3Digest(data, inputEncoding = 'utf8', outputEncoding = 'hex') {
  return SM3.digest(data, inputEncoding, outputEncoding)
}
// SM4加密
export function sm4Encrypt(data, options = {}, iv) {
  const sm4Mode = options.mode || SM4.constants.ECB
  const sm4Key = strToHex(SM4_KEY)
  iv = iv || SM4_IV
  let encryptData
  if (sm4Mode === SM4.constants.ECB) {
    encryptData = SM4.encrypt(data, sm4Key, {
      mode: sm4Mode, // ECB | CBC
      inputEncoding: 'utf8',
      outputEncoding: 'hex',
      ...options,
    })
  } else {
    encryptData = SM4.encrypt(data, sm4Key, {
      mode: sm4Mode, // ECB | CBC
      inputEncoding: 'utf8',
      outputEncoding: 'hex',
      iv: strToHex(iv),
      ...options,
    })
  }
  return encryptData
}
// SM4解密
export function sm4Decrypt(data, options = {}) {
  const sm4Key = strToHex(SM4_KEY)
  const sm4Mode = options.mode || SM4.constants.ECB
  let decryptData
  if (sm4Mode === SM4.constants.ECB) {
    decryptData = SM4.decrypt(data, sm4Key, {
      mode: sm4Mode,
      inputEncoding: 'hex',
      outputEncoding: 'utf8',
      ...options,
    })
  } else {
    decryptData = SM4.decrypt(data, sm4Key, {
      mode: sm4Mode,
      inputEncoding: 'hex',
      outputEncoding: 'utf8',
      iv: strToHex(SM4_IV),
      ...options,
    })
  }
  return decryptData
}

export function strToHex(str) {
  return [...str].map((char) => char.charCodeAt().toString(16)).join('')
}

export default {
  sm2Encrypt,
  sm2Decrypt,
  sm3Digest,
  sm4Encrypt,
  sm4Decrypt,
  strToHex,
}
