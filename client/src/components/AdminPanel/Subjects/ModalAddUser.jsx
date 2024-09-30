import { useState, useEffect } from 'react';
import { removeUserFromCurriculumUnit, addUsersToCurriculumUnit } from '../../../redux/actions';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';

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

export default function ModalAddUser({ IsOpen, SetIsOpen, Title, Users, CurrentUnitCurr = [] }) {
  const dispatch = useDispatch();
  const [currentUserId,setCurrentUserId] = useState(0);

  const handleClose = () => SetIsOpen(false);
  
  useEffect(() => {
    const handleToggleUser = (userId) => {
      if (CurrentUnitCurr.length > 0) {
        const isUserInCurrUnit = CurrentUnitCurr[0].Users.some(user => user.id === userId);
        if (isUserInCurrUnit) {
          dispatch(removeUserFromCurriculumUnit(CurrentUnitCurr[0].id, userId));
        } else {
          dispatch(addUsersToCurriculumUnit(CurrentUnitCurr[0].id, [userId]));
        }
      }
    };
    currentUserId > 0 ? handleToggleUser(currentUserId) : console.log("not done")
  },[currentUserId])

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
            <div>
              {Users.map((user) => 
                <Button key={user.id} id="basic-button" onClick={() => setCurrentUserId(user.id)}>
                  <Avatar>{user.name[0] + user.lastName[0]}</Avatar>
                  <label>{user.name + " " + user.lastName}</label>
                </Button>
              )}
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
