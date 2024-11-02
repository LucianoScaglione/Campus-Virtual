import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Users.scss';
import ModalUserAdd from './ModalUserAdd';
import ModalUserEdit from "./ModalUserEdit";

import { deleteUser, getUsers} from '../../../redux/actions';

import spinner from '../../../images/svg/spinner.svg';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid} from '@mui/x-data-grid';
import { GridToolbarContainer } from '@mui/x-data-grid';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 50},
    { field: 'dni', headerName: 'DNI', flex: 1, minWidth: 100 },
    { field: 'name', headerName: 'First name', flex: 1, minWidth: 100 },
    { field: 'lastName', headerName: 'Last name' , flex: 2, minWidth: 100},
    { field: 'dateOfBirth', headerName: 'Birthdate', flex: 1, minWidth: 100 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'address', headerName: 'Address' , flex: 1, minWidth: 130},
    { field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 130 },
    { field: 'ranks', headerName: 'Ranks', flex: 1, minWidth: 70 },
    { field: 'userActive', headerName: 'Active', flex: 1, minWidth: 70 },
    { field: 'actions', sortable: false, headerName: 'Actions' , flex: 1, minWidth: 200,renderCell: (params) => (
      <div>
        <StyledTableCell align="center">
          <EditIcon sx={{ cursor: 'pointer', fontSize: 20, marginRight: 1 }} title='Edit' onClick={() => handleOpenEdit(params.row.id)} />
          <DeleteIcon sx={{ cursor: 'pointer', fontSize: 20 }} title='Delete' onClick={() => dropUser(params.row.id)}/>
        </StyledTableCell>
      </div>
    )}
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', padding: '8px' }}>
        <TextField
          variant="outlined"
          placeholder="SEARCH USER"
          size="small"
          sx={{ maxWidth: '200px' , display: "transparent"}}
        />
        <div style={{display: "flex",gap: "15px"}}>
          <Button variant="text" onClick={() => dispatch(getUsers())}>SHOW All users</Button>
          <Button variant="contained" onClick={() => setIsOpenCreate(true)}>ADD user</Button>
        </div>
      </GridToolbarContainer>
    );
  }

  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [userSelected, setUserSelected] = useState(-1);

  const handleOpenEdit = (id) => {
    setUserSelected(id);
    setIsOpenEdit(true);
  }

  const [loader, setLoader] = useState(true);
  
  const dropUser = (id) => {
    swal({
      title: "Are you sure you want to delete this user?",
      text: "Once deleted, the account will no longer exist",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteUser(id));
        } else {
          swal("Deletion has been cancelled");
        };
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    dispatch(getUsers()).then(setLoader(false));
  }, [dispatch]);

  if (loader) {
    return <img src={spinner} className='spinner' alt='' />
  };
  return (
    <div>
        
        <Paper sx={{ height: '87.5vh', width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            slots={{
              toolbar: CustomToolbar,
            }}
            sx={{ border: 0 }}
          />
        </Paper>

        <ModalUserEdit IsOpen={isOpenEdit} SetIsOpen={setIsOpenEdit} Title="Edit User" CurrentUser={users.filter((user) => user.id == userSelected)} />
        <ModalUserAdd IsOpen={isOpenCreate} SetIsOpen={setIsOpenCreate} Title="Create User" />

      
    </div>
  );
};

export default Users;