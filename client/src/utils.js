import {isExpired} from 'react-jwt'

function getToken() {
  return localStorage.getItem('token')
}

function setToken(token) {
  return localStorage.setItem('token', token)
}

function checkCurrentUserAuth() {
  const token = getToken()
  return (token && !isExpired(token))
}

function deleteToken() {
  localStorage.removeItem('token')
  window.location = '/'
}

export {getToken, checkCurrentUserAuth, deleteToken, setToken}
