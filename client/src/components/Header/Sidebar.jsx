import * as React from 'react'
import './header.scss'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MenuIcon from '@mui/icons-material/Menu'
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnit } from '../../redux/actions'
import { Link } from 'react-router-dom';


import { informationUser } from '../../redux/actions';



export default function Sidebar() {

  //controlador del sidebar
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  //llamada a las unidades curriculares
  const dispatch = useDispatch();
  const curriculumUnit = useSelector(state => state.curriculumUnit);

  useEffect(() => {
    !curriculumUnit.length &&
      dispatch(getCurriculumUnit());
  }, [dispatch, curriculumUnit.length])

  const userData = informationUser().user

  function inArray(target, array){
    return array.some(user => user.id === target)
  }


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>

        {/* EN ESTE APARTADO IRAN LAS OPCIONES QUE NO REQUIEREN MAP, ES DECIR AQUELLAS QUE NO REQUIERAN ALGUN TIPO DE ARRAY NI NADA POR EL ESTILO*/}
        <Link to={`archivados`}> <ListItem key={'Archivados'} disablePadding>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <InboxIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={'Archivados'} />
          </ListItemButton>
        </ListItem> </Link>


      </List>

      <Divider />

      <List>

        {
          curriculumUnit.length ? curriculumUnit.map(c => {
            return (
              inArray(userData.id,c.Users) || userData.ranks == "Admin" ?
              <div key={c.id}>
                <Link to={`/curriculumUnit/${c.id}/news`}>
                  <ListItem key={c.id} disablePadding>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={c.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div> : null
            );
          }) : null
        }
      </List>

    </Box>
  )

  return (
    <div>
      <Button variant="text" onClick={toggleDrawer(true)}><MenuIcon /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}

      </Drawer>
    </div>
  );
}