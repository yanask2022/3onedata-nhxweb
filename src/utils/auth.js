import Cookies from 'js-cookie'

const TokenKey = 'sysauth'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    secure: window.location.protocol === 'https:',
    sameSite: 'strict',
    expires: 1 // 1 day expiration
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
