import {isExpired} from 'react-jwt'

function getToken() {
  return sessionStorage.getItem('token')
}

function setToken(token) {
  return sessionStorage.setItem('token', token)
}

function checkCurrentUserAuth() {
  const token = getToken()
  return (token && !isExpired(token))
}

function deleteToken() {
  sessionStorage.removeItem('token')
  window.location = '/'
}

export {getToken, checkCurrentUserAuth, deleteToken, setToken}
