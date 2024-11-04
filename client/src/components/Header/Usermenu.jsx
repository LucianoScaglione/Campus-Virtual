import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import './header.scss'
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { isAuthenticated } from '../PrivatesRoutesAdmin'
import { Link } from 'react-router-dom'

export default function Usermenu({ firstLetters }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  };
  const userLogin = isAuthenticated();
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar> {firstLetters} </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} className='MenuOption'><AccountBoxIcon />Perfil</MenuItem>
        <MenuItem onClick={handleClose} className='MenuOption'><ChatIcon />Chat</MenuItem>
        {userLogin.user.ranks === 'Admin' && <MenuItem onClick={handleClose} className='MenuOption'><AdminPanelSettingsIcon /><Link to='/admin/panel/users'>Admin panel</Link></MenuItem>}
        <MenuItem onClick={() => { localStorage.removeItem("user"); window.location.reload(); }} className='MenuOption'><LogoutIcon />Cerrar Sesion</MenuItem>
      </Menu>
    </div>
  );
}