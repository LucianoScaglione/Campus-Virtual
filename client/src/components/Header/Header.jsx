import React from 'react'
import './header.scss'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import { Link } from 'react-router-dom'

import Sidebar from './Sidebar'
import Usermenu from './Usermenu'

import PrivatesRoutes from '../PrivatesRoutes'
import { informationUser } from '../../redux/actions'

function Header() {

  const userData = informationUser().user

  return (
    <div className="header">
      <div className='header-left'>
        <Sidebar />
        <Link to={`/`}><Button className='Button' variant="text" ><h2>CAMPUS VIRTUAL</h2></Button></Link>
      </div>

      <div className='header-right'>
        <Usermenu firstLetters={userData.name[0] +userData.lastName[0]}/>
        <Button variant="text">{userData.name +" "+ userData.lastName}</Button>
      </div>

    </div>
  );
}

export default Header;
