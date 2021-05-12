import { useState } from 'react'

export default function useToken() {

  function getToken() {
    return localStorage.getItem('token')
  }
  const [token, setToken] = useState(getToken())

  function saveToken(token) {
    localStorage.setItem('token', token)
    setToken(token)  
  } 

 return [token, saveToken]
} 