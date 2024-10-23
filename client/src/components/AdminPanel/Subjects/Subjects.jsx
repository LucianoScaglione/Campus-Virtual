import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Subjects.scss';
import ModalSubject from './ModalSubject';
import ModalAddUser from './ModalAddUser';
import ModalRemoveUser from './ModalRemoveUser';


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
import ModalListUsers from './ModalListUsers';

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


  const clearInput = {
    name: "",
    description: "",
    assignedTeacher: "",
    createdAt: "",
    updatedAt: "",
    Users: []
  };

  const [input, setInput] = useState(clearInput);
  

  const currUnits = useSelector(state => state.curriculumUnit);
  useEffect(() => {
    dispatch(getCurriculumUnit()).then(setLoader(false));
  }, [dispatch]);

  const currUnit = useSelector(state => state.detailCurriculumUnit);
  useEffect(() => {
    currUnit && setInput({
      name: currUnit.name,
      description: currUnit.description,
      assignedTeacher: currUnit.assignedTeacher,
      createdAt: currUnit.createdAt,
      updatedAt: currUnit.updatedAt,
      Users: []
    });
  }, [currUnit]);

  const users = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getUsers()).then(setLoader(false));
  }, [dispatch]);


  const handleClick = (id) => {
    console.log("done")
    setIsOpenEdit(true);
    dispatch(detailCurriculumUnit(id));
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitEdit = () => {
    dispatch(updateCurriculumUnit(currUnit.id, input));
  };
  const handleSubmitCreate = async () => {
    dispatch(createCurriculumUnit(input));
    setInput(clearInput)
  };
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

      <div className='upperContainer'>
        <Button variant="text" onClick={() => dispatch(getCurriculumUnit())}>All Subjects</Button>
        <Button variant="contained" onClick={() => setIsOpenCreate(true)}>Create Subject</Button>
        <div className='searchContainer'>
          <form>
            <TextField
              id="standard-search"
              label="Search Subject"
              type="search"
              variant="standard"
              fullWidth
              InputProps={{ style: { color: '#ffffff' } }}
              InputLabelProps={{ style: { color: '#ffffff' } }}
              onChange={handleChangeSearch}
            />
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
          </form>
        </div>
      </div>

      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">DESCRIPTION</StyledTableCell>
                <StyledTableCell align="center">ASSIGNED TEACHER</StyledTableCell>
                <StyledTableCell align="center">CREATED</StyledTableCell>
                <StyledTableCell align="center">UPDATED</StyledTableCell>
                <StyledTableCell align="center">USERS</StyledTableCell>
                <StyledTableCell align="center">ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!currUnits.length ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={10} align="center">
                    <div className='noUsersContainer'>
                      <h2>No Registered Subjects</h2>
                      <p>Please add a user to get started.</p>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                currUnits.map((currUnit) => (
                  <StyledTableRow key={currUnit.id}>
                    <StyledTableCell align="center">{currUnit.id}</StyledTableCell>
                    <StyledTableCell align="center">{currUnit.name}</StyledTableCell>
                    <StyledTableCell align="center">{currUnit.description}</StyledTableCell>
                    <StyledTableCell align="center">{currUnit.assignedTeacher}</StyledTableCell>
                    <StyledTableCell align="center">{currUnit.createdAt}</StyledTableCell>
                    <StyledTableCell align="center">{currUnit.updatedAt}</StyledTableCell>
                    <StyledTableCell align="center">
                      <PeopleIcon sx={{ cursor: 'pointer', fontSize: 20  }} onClick={() => handleClickListUsers(currUnit.id)}/>
                      <PersonAddIcon sx={{ cursor: 'pointer', fontSize: 20 }} onClick={() => handleClickUsersAdd(currUnit.id)}/>
                      <PersonRemoveIcon sx={{ cursor: 'pointer', fontSize: 20 }} onClick={() => handleClickUsersRemove(currUnit.id)}/>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon sx={{ cursor: 'pointer', fontSize: 20, marginRight: 1 }} title='Edit' onClick={() => handleClick(currUnit.id)} />
                      <DeleteIcon sx={{ cursor: 'pointer', fontSize: 20 }} title='Delete' onClick={() => dropCurrUnit(currUnit.id)} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <ModalSubject isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} titleModalUser="Subjects" dispatch={handleSubmitEdit}>
          <h2>Edit Subject</h2>
          <form onChange={handleChange}>
            <label>Name</label>
            <input type='text' name='name' defaultValue={input.lastName} placeholder='Enter a name' />
            <label>Description</label>
            <input type='text' name='description' placeholder='Enter a description' />
            <label>Assigned Teacher</label>
            <input type='text' name='assignedTeacher' placeholder='Enter the assigned teacher' />
          </form>
        </ModalSubject>

        <ModalSubject isOpen={isOpenCreate} setIsOpen={setIsOpenCreate} titleModalUser="Subject" dispatch={handleSubmitCreate}>
          <h2>Create Subject</h2>
          <form onChange={handleChange}>
            <label>Name</label>
            <input type='text' name='name' placeholder='Enter a name' />
            <label>Description</label>
            <input type='text' name='description' placeholder='Enter a description' />
            <label>Assigned Teacher</label>
            <input type='text' name='assignedTeacher' placeholder='Enter the assigned teacher' />
          </form>
        </ModalSubject>

        <ModalAddUser IsOpen={isOpenAddUser} SetIsOpen={setIsOpenAddUser} Title="Add users" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)} Users={users}/>
        <ModalRemoveUser IsOpen={isOpenRemoveUser} SetIsOpen={setIsOpenRemoveUser} Title="Remove users" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)} Users={users}/>
        <ModalListUsers IsOpen={isOpenListUsers} SetIsOpen={setIsOpenListUsers} Title="User list" CurrentUnitCurr={currUnits.filter((cu) => cu.id == currentUnitCurrId)} Users={users}/>

    </div>
  );
};

export default Subjects;