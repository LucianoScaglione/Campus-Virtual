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
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurriculumUnit } from '../../redux/actions'
import { Link } from 'react-router-dom';
import { informationUser } from '../../redux/actions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalJoinCurrUnit from '../HomeContent/ModalJoinCurrUnit'



export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
      <ModalJoinCurrUnit IsOpen={isOpen} SetIsOpen={setIsOpen} Title={"Join to Curricular Unit with Invite Code"}/>
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