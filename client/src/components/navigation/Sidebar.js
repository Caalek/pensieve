import React, { useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'
import useToken from '../../hooks/useToken'
import './Sidebar.css'
import ConfirmDialog from '../other/ConfirmDialog'

export default function Sidebar(props) {
    const [token, setToken] = useToken()
    const [isLoggedOut, setIsLoggetOut] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)

    useEffect(() => {
      if (props.active) {
      document.querySelectorAll(`a.sidebar-link[href="${props.active}"]`)[0].classList.add('active')
      }
    }, [props.active])

    function logout() {
      setToken(undefined)
      setIsLoggetOut(true)
    }

    if (isLoggedOut) {
      return <Redirect to="/home" />
    }

    return (
      <div id="sidebar" className="sidebar">
        <a className="sidebar-link" href="/notes/all"><i className="far fa-sticky-note"></i> Notes</a>
        <a className="sidebar-link" href="/notes/archive"><i className="fas fa-archive"></i> Archive</a>
        <a className="sidebar-link" href="/notes/trash"><i className="fas fa-trash-alt"></i> Trash</a>
        <br></br>
        <a className="sidebar-link" href="/settings"><i className="fas fa-cog"></i> Settings</a>
        <span className="sidebar-link" onClick={() => {setOpenConfirm(true)}}><i className="fas fa-sign-out-alt"></i> Log out</span>
        <ConfirmDialog 
        show={openConfirm}
        setShow={setOpenConfirm}
        onConfirm={logout}
        title="Already leaving us?"
        text="Are you sure you want to log out?"
        />
      </div>
    )
}