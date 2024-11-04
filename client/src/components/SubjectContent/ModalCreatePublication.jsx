import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPublication, informationUser } from '../../redux/actions'; // Asegúrate de que esta acción esté definida en tu archivo de acciones
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

export default function ModalCreatePublication({ IsOpen, SetIsOpen, onCreatePublication, currentUnitId }) {
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    });
    const userData = informationUser().user;
    const handleClose = () => SetIsOpen(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    };

    const handleSubmit = () => {
    if (currentUnitId) {
        onCreatePublication({
        ...formData,
        CurriculumUnitId: currentUnitId,
        UserId: userData.id,
        });
        handleClose();
        setFormData({ title: '', description: '' });
    } else {
        console.error('No se pudo obtener el ID de la unidad curricular');
    }
    };

    return (
    <Modal
        open={IsOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Crear Nueva Publicación
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
            <TextField
            fullWidth
            margin="normal"
            name="title"
            label="Título"
            value={formData.title}
            onChange={handleChange}
            required
            sx={{
              '& .MuiInputLabel-root': {
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip'
              },
              '& .MuiFormLabel-asterisk': {
                display: 'none'
              }
            }}
            />
            <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Descripción"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            sx={{
              '& .MuiInputLabel-root': {
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip'
              },
              '& .MuiFormLabel-asterisk': {
                display: 'none'
              }
            }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} variant="contained" disabled={!currentUnitId}>
                Crear
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }