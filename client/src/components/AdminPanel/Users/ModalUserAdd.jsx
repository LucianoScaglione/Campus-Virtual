import * as React from 'react';
import { useState } from 'react';
import { createUser } from '../../../redux/actions';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';


import './Users.scss';

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

export default function ModalSubjectNew({ IsOpen, SetIsOpen, Title}) {
  const handleClose = () => SetIsOpen(false);
  const dispatch = useDispatch();

  const clearInput = {
    dni: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    address: '',
    phone: '',
    ranks: '',
    password: '',
    userActive: ''
  };
  const [input, setInput] = useState(clearInput);
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitCreate = async () => {
    SetIsOpen(false);
    dispatch(createUser(input));
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
            <form onChange={handleChangeInput} className='ModalUserContainer'>
                <TextField id="standard-basic" label="DNI" name='dni' variant="standard" />
                <TextField id="standard-basic" label="Name" name='name' variant="standard"/>
                <TextField id="standard-basic" label="Last Name" name='lastName' variant="standard" />
                <TextField id="standard-basic" label="Date of Birth" name='dateOfBirth' defaultValue={"0001-01-01"} type='date' variant="standard" />
                <TextField id="standard-basic" label="Address" name='address' variant="standard" />
                <TextField id="standard-basic" label="Phone Number" name='phone' variant="standard" />
                <NativeSelect
                  defaultValue={"Student"}
                  inputProps={{
                    name: 'ranks',
                    id: 'uncontrolled-native',
                  }}
                >
                  <option value={"Student"}>Student</option>
                  <option value={"Teacher"}>Teacher</option>
                  <option value={"Admin"}>Admin</option>
                </NativeSelect>

                <br/>
            </form>

            <div className='ButtonContainer'>
              <button onClick={handleSubmitCreate}>CREATE</button>
              <button onClick={handleClose}>EXIT</button>
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}
