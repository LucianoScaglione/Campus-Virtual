import * as React from 'react';
import { useState } from 'react';

import { updateCurriculumUnit } from '../../../redux/actions';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import NativeSelect from '@mui/material/NativeSelect';
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
//cambiar "new"
export default function ModalSubjectEdit({ IsOpen, SetIsOpen, Title, CurrentUnitCurr = []}) {
  const handleClose = () => SetIsOpen(false);
  const dispatch = useDispatch();

  const clearInput = {
    name: "",
    description: "",
    assignedTeacher: "",
    createdAt: "",
    updatedAt: "",
    Users: []
  };
  const [input, setInput] = useState(clearInput);
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = () => {
    SetIsOpen(false);
    dispatch(updateCurriculumUnit(CurrentUnitCurr[0].id, input));
  };

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
            <form onChange={handleChangeInput} className='ModalSubjectContainer'>
                <TextField id="standard-basic" label="Name" name='name' variant="standard" defaultValue={CurrentUnitCurr[0].name}/>
                <TextField id="standard-basic" label="Description" name='description' variant="standard" defaultValue={CurrentUnitCurr[0].description}/>
                <TextField id="standard-basic" label="Assigned Teacher" name='assignedTeacher' variant="standard" defaultValue={CurrentUnitCurr[0].assignedTeacher}/>
                <TextField id="standard-basic" label="Invite Code" name='inviteCode' variant="standard" defaultValue={CurrentUnitCurr[0].inviteCode}/>
                <NativeSelect
                  defaultValue={CurrentUnitCurr[0].userActive}
                  inputProps={{
                    name: 'active',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </NativeSelect>
            </form>
            <div className='ButtonContainer'>
              <button onClick={handleSubmitEdit}>EDIT</button> 
              <button onClick={handleClose}>EXIT</button>
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
