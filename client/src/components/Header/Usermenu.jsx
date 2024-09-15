import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import './header.scss'

import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Usermenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar> {"PH" /*ESTO HAY QUE HACERLO POR CODIGO (NAME[0] LASTNAME[0])*/} </Avatar>
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
        <MenuItem onClick={handleClose} className='MenuOption'><AccountBoxIcon/>Perfil</MenuItem>
        <MenuItem onClick={handleClose} className='MenuOption'><ChatIcon/>Chat</MenuItem>
        {/*ACA IRIA EL MENU ITEM SI SOS ADMIN PARA IR AL ADMIN PANEL XD*/}
        <MenuItem onClick={handleClose} className='MenuOption'><LogoutIcon/>Cerrar Sesion</MenuItem>
      </Menu>
    </div>
  );
}