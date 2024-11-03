import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Subjects.scss';
import ModalSubject from './ModalSubject'; //borrar dsp
import ModalSubjectNew from './ModalSubjectNew';
import ModalSubjectEdit from './ModalSubjectEdit';
import ModalAddUser from './ModalAddUser';
import ModalRemoveUser from './ModalRemoveUser';
import ModalListUsers from './ModalListUsers';

import { getUsers, getCurriculumUnit, detailCurriculumUnit, createCurriculumUnit, deleteCurriculumUnit, updateCurriculumUnit, searchUnitCurr} from '../../../redux/actions';
import spinner from '../../../images/svg/spinner.svg';

import swal from 'sweetalert';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PeopleIcon from '@mui/icons-material/People';
import { DataGrid} from '@mui/x-data-grid';
import { GridToolbarContainer } from '@mui/x-data-grid';

const Subjects = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState('')
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [isOpenAddUser, setIsOpenAddUser] = useState(false); 
  const [isOpenRemoveUser, setIsOpenRemoveUser] = useState(false); 
  const [isOpenListUsers, setIsOpenListUsers] = useState(false); 
  const [currentUnitCurrId, setCurrentUnitCurrId] = useState(-1);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70},
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 70 },
    { field: 'assignedTeacher', headerName: 'Assigned Teacher', flex: 1, minWidth: 160 },
    { field: 'description', headerName: 'Description' , flex: 2, minWidth: 170},
    { field: 'createdAt', headerName: 'Created', flex: 1, minWidth: 130 },
    { field: 'updatedAt', headerName: 'Updated' , flex: 1, minWidth: 130},
    { field: 'users', sortable: false, headerName: 'Users', flex: 1, minWidth: 100 ,renderCell: (params) => (
      <StyledTableCell align="center">
        <PeopleIcon sx={{ cursor: 'pointer', fontSize: 20  }} onClick={() => handleClickListUsers(params.row.id)}/>
        <PersonAddIcon sx={{ cursor: 'pointer', fontSize: 20 }} onClick={() => handleClickUsersAdd(params.row.id)}/>
        <PersonRemoveIcon sx={{ cursor: 'pointer', fontSize: 20 }} onClick={() => handleClickUsersRemove(params.row.id)}/>
      </StyledTableCell>
    )},
    { field: 'actions', sortable: false, headerName: 'Actions' , flex: 1, minWidth: 80,renderCell: (params) => (
      <StyledTableCell align="center">
        <EditIcon sx={{ cursor: 'pointer', fontSize: 20, marginRight: 1 }} title='Edit' onClick={() => handleClickEditSubject(params.row.id)} />
        <DeleteIcon sx={{ cursor: 'pointer', fontSize: 20 }} title='Delete' onClick={() => dropCurrUnit(params.row.id)} />
      </StyledTableCell>
    )}
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', padding: '8px' }}>
        <TextField
          variant="outlined"
          placeholder="SEARCH SUBJECT"
          size="small"
          sx={{ maxWidth: '200px' , display: "transparent"}}
        />
        <div style={{display: "flex",gap: "15px"}}>
          <Button variant="text" onClick={() => dispatch(getCurriculumUnit())}>Show All Subjects</Button>
          <Button variant="contained" onClick={() => setIsOpenCreate(true)}>Create Subject</Button>
        </div>
      </GridToolbarContainer>
    );
  }

  const clearInput = {
    name: "",
    description: "",
    assignedTeacher: "",
    createdAt: "",
    updatedAt: "",
    Users: []
  };

  const currUnits = useSelector(state => state.curriculumUnit);
  useEffect(() => {
    dispatch(getCurriculumUnit()).then(setLoader(false));
  }, [dispatch]);


  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getUsers()).then(setLoader(false));
  }, [dispatch]);
  
  const dropCurrUnit = (id) => {
    swal({
      title: "Are you sure you want to delete this subject?",
      text: "Once deleted, the curricular unit will no longer exist",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteCurriculumUnit(id));
        } else {
          swal("Deletion has been cancelled");
        };
      });
  };

  const handleClickEditSubject = (currentUnitCurrId) => {
    setIsOpenEdit(true);
    setCurrentUnitCurrId(currentUnitCurrId);
  };

  const handleClickUsersAdd = (currentUnitCurrId) => {
    setCurrentUnitCurrId(currentUnitCurrId);
    setIsOpenAddUser(true);
  }
  
  const handleClickUsersRemove = (currentUnitCurrId) => {
    setCurrentUnitCurrId(currentUnitCurrId);
    setIsOpenRemoveUser(true);
  }

  const handleClickListUsers = (currentUnitCurrId) => {
    setCurrentUnitCurrId(currentUnitCurrId);
    setIsOpenListUsers(true);
  }

  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(searchUnitCurr(e.target.value));
  };

  if (loader) {
    return <img src={spinner} className='spinner' alt='' />
  };


  //estilos
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  return (
    <div>

        <Paper sx={{ height: '87.5vh', width: '100%' }}>
          <DataGrid
            rows={currUnits}
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
      
        <ModalSubjectNew IsOpen={isOpenCreate} SetIsOpen={setIsOpenCreate} Title="Create Subject"/>
        <ModalSubjectEdit IsOpen={isOpenEdit} SetIsOpen={setIsOpenEdit} Title="Edit Subject" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)}/>
        <ModalAddUser IsOpen={isOpenAddUser} SetIsOpen={setIsOpenAddUser} Title="Add users" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)} Users={users}/>
        <ModalRemoveUser IsOpen={isOpenRemoveUser} SetIsOpen={setIsOpenRemoveUser} Title="Remove users" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)} Users={users}/>
        <ModalListUsers IsOpen={isOpenListUsers} SetIsOpen={setIsOpenListUsers} Title="User list" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)} Users={users}/>

    </div>
  );
};

export default Subjects;