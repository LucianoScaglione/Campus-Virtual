import { useState} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { informationUser, getCurriculumUnitByInviteCode, addUsersToCurriculumUnit } from '../../redux/actions';
import TextField from '@mui/material/TextField';

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

export default function ModalJoinCurrUnit({ IsOpen, SetIsOpen, Title }) {
  const dispatch = useDispatch();
  const handleClose = () => SetIsOpen(false);
  const userData = informationUser().user
  const [inputInviteCode, setInputInviteCode] = useState("");

  const handleChangeInput = (e) => {
    setInputInviteCode(e.target.value);
  };

  const handleJoin = async () => {
    SetIsOpen(false)
    const curriculumUnitData = await dispatch(getCurriculumUnitByInviteCode(inputInviteCode));
    dispatch(addUsersToCurriculumUnit(curriculumUnitData.id, [userData.id])); 
  }

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
            <form onChange={handleChangeInput} className='ModalSubjectContainer'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {Title}
            </Typography>
            
            <TextField id="standard-basic" label="Invite code" name='inviteCode' variant="standard"/>
            </form>

            <div className='ButtonContainer'>
              <button onClick={handleJoin}>JOIN</button>
              <button onClick={handleClose}>EXIT</button>
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
