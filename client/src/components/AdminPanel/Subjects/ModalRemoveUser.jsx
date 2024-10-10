import { useState, useEffect } from 'react';
import { removeUsersFromCurriculumUnit } from '../../../redux/actions';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import './Subjects.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "black"
};

export default function ModalRemoveUser({ IsOpen, SetIsOpen, Title, Users, CurrentUnitCurr = [] }) {
  const dispatch = useDispatch();
  const handleClose = () => SetIsOpen(false);

  const [addedRemovedUsers,setAddedRemovedUsers] = useState([]);
  //window.location.reload();
  const handleAdd = (id) => {
    addedRemovedUsers.includes(id) ? null : setAddedRemovedUsers([...addedRemovedUsers, id]);
  }

  const handleRemove = (id) => {
    setAddedRemovedUsers(addedRemovedUsers.filter(e => e !== id))
  }

  const handleRemoveFromDb = () => {
    dispatch(removeUsersFromCurriculumUnit(CurrentUnitCurr[0].id, addedRemovedUsers));
  }

      // dispatch(addUsersToCurriculumUnit(CurrentUnitCurr[0].id, [Id]));

      // dispatch(removeUserFromCurriculumUnit(CurrentUnitCurr[0].id, Id));


  return (
    <div>
      {IsOpen ? (
        <Modal
          open={IsOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {Title}
            </Typography>
            <div className='UsersContainer'>
              <div className='UsersInCurrUnit'>
                

                {CurrentUnitCurr[0].Users.map((user) => {
                  return (
                  !addedRemovedUsers.includes(user.id) &&
                  <div className='UserCard' style={{ cursor: 'pointer'}} onClick={() => handleAdd(user.id)}>
                    <Avatar>{user.name[0] + user.lastName[0]}</Avatar>
                    <label>{user.name + " " + user.lastName}</label>
                  </div>
                  )
                })}
              </div>
              <div className='RemoveZone'>
                {Users.map((user) => {
                  return (
                    addedRemovedUsers.includes(user.id) &&
                    <div className='UserCard' key={user.id} style={{ cursor: 'pointer'}} onClick={() => handleRemove(user.id)}>
                      <Avatar>{user.name[0] + user.lastName[0]}</Avatar>
                      <label>{user.name + " " + user.lastName}</label>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='ButtonContainer'>
              <button onClick={handleRemoveFromDb}>SEND</button>
              <button onClick={handleClose}>EXIT</button>
            </div>
            
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
