import React from 'react'
import './header.scss'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import { Link } from 'react-router-dom'

import Sidebar from './Sidebar'
import Usermenu from './Usermenu'

function Header() {

  return (
    <div className="header">
      <div className='header-left'>
        <Sidebar />
        <Link to={`/`}><Button className='Button' variant="text" ><h2>CAMPUS VIRTUAL</h2></Button></Link>
      </div>

      <div className='header-right'>
        <button onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>Cerrar sesión</button>
        <Usermenu />
        <Button variant="text">Place Holder</Button>
      </div>

    </div>
  );
}

export default Header;
