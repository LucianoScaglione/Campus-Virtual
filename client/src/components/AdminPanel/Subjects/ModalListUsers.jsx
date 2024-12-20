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
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
  color: "black"
};

export default function ModalListUsers({ IsOpen, SetIsOpen, Title, Users, CurrentUnitCurr = [] }) {
  const handleClose = () => SetIsOpen(false);

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
              <div className='UsersListContainer UsersInCurrUnit AllUsersListContainer'>
                {Users.map((user) => {
                  return (
                    CurrentUnitCurr[0].Users.some(currUser => currUser.id === user.id) &&
                    <div className='UserCard' key={user.id}>
                      <Avatar>{user.name[0] + user.lastName[0]}</Avatar>
                      <label>{user.name + " " + user.lastName}</label>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='ButtonContainer'>
              <button onClick={handleClose}>EXIT</button>
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
