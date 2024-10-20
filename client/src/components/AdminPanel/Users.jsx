import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Users.scss';
import ModalUser from './ModalUser';
import { createUser, deleteUser, getUser, getUsers, searchUsers, updateUser } from '../../redux/actions';
import spinner from '../../images/svg/spinner.svg';
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

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [input, setInput] = useState({
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
  });
  const [create, setCreate] = useState({
    dni: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    address: '',
    phone: '',
    ranks: '',
    userActive: ''
  });
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState('')
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleChangeCreate = (e) => {
    setCreate({ ...create, [e.target.name]: e.target.value });
  };
  const handleClick = (id) => {
    setIsOpen(true);
    dispatch(getUser(id));
  };
  const handleSubmitEdit = () => {
    dispatch(updateUser(user.id, input));
  };
  const handleSubmitCreate = async () => {
    dispatch(createUser(create));
  };
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
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(searchUsers(e.target.value));
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
  useEffect(() => {
    dispatch(getUsers()).then(setLoader(false));
  }, [dispatch]);
  useEffect(() => {
    user && setInput({
      dni: user.dni,
      name: user.name,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      address: user.address,
      phone: user.phone,
      ranks: user.ranks,
      userActive: user.userActive
    });
  }, [user]);
  if (loader) {
    return <img src={spinner} className='spinner' alt='' />
  };
  return (
    <div>
      <div className='upperContainer'>
        <Button variant="text" onClick={() => dispatch(getUsers())}>All users</Button>
        <Button variant="contained" onClick={() => setIsOpen2(true)}>Create user</Button>
        <div className='searchContainer'>
          <form>
            <TextField
              id="standard-search"
              label="Search user"
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
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">DNI</StyledTableCell>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">LAST NAME</StyledTableCell>
                <StyledTableCell align="center">DATE OF BIRTH</StyledTableCell>
                <StyledTableCell align="center">EMAIL</StyledTableCell>
                <StyledTableCell align="center">ADDRESS</StyledTableCell>
                <StyledTableCell align="center">PHONE</StyledTableCell>
                <StyledTableCell align="center">RANKS</StyledTableCell>
                <StyledTableCell align="center">ACTIVE</StyledTableCell>
                <StyledTableCell align="center">ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!users.length ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={10} align="center">
                    <div className='noUsersContainer'>
                      <h2>No Registered Users</h2>
                      <p>Please add a user to get started.</p>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell align="center">{user.id}</StyledTableCell>
                    <StyledTableCell align="center">{user.dni}</StyledTableCell>
                    <StyledTableCell align="center">{user.name}</StyledTableCell>
                    <StyledTableCell align="center">{user.lastName}</StyledTableCell>
                    <StyledTableCell align="center">{user.dateOfBirth}</StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.address}</StyledTableCell>
                    <StyledTableCell align="center">{user.phone}</StyledTableCell>
                    <StyledTableCell align="center">{user.ranks}</StyledTableCell>
                    <StyledTableCell align="center">{user.userActive ? 'true' : 'false'}</StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon sx={{ cursor: 'pointer', fontSize: 20, marginRight: 1 }} title='Edit' onClick={() => handleClick(user.id)} />
                      <DeleteIcon sx={{ cursor: 'pointer', fontSize: 20 }} title='Delete' onClick={() => dropUser(user.id)}/>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <ModalUser isOpen={isOpen} setIsOpen={setIsOpen} titleModalUser="Users" dispatch={handleSubmitEdit}>
          <h2>Edit user</h2>
          <form onChange={handleChange}>
            <label>DNI</label>
            <input type='text' name='dni' defaultValue={input.dni} placeholder='Edit dni' />
            <label>Name</label>
            <input type='text' name='name' defaultValue={input.name} placeholder='Edit name' />
            <label>Last name</label>
            <input type='text' name='lastName' defaultValue={input.lastName} placeholder='Edit last name' />
            <label>Date of birth</label>
            <input type='text' name='dateOfBirth' defaultValue={input.dateOfBirth} placeholder='Edit date of birth' />
            <label>Email</label>
            <input type='email' name='email' defaultValue={input.email} placeholder='Edit email' />
            <label>Address</label>
            <input type='text' name='address' defaultValue={input.address} placeholder='Edit address' />
            <label>Phone</label>
            <input type='number' name='phone' defaultValue={input.phone} placeholder='Edit phone' />
            <label>Ranks</label>
            <select name='ranks'>
              <option hidden>{user.ranks}</option>
              <option value='Student'>Student</option>
              <option value='Teacher'>Teacher</option>
              <option value='Admin'>Admin</option>
            </select>
            <label>User active</label>
            <select name='userActive'>
              <option hidden>{user.userActive && user.userActive.toString()}</option>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </form>
        </ModalUser>

        <ModalUser isOpen={isOpen2} setIsOpen={setIsOpen2} titleModalUser="Users" dispatch={handleSubmitCreate}>
          <h2>Create user</h2>
          <form onChange={handleChangeCreate}>
            <label>DNI</label>
            <input type='text' name='dni' placeholder='Enter an ID' />
            <label>Name</label>
            <input type='text' name='name' placeholder='Enter a name' />
            <label>Last name</label>
            <input type='text' name='lastName' placeholder='Enter a last name' />
            <label>Date of birth</label>
            <input type='date' name='dateOfBirth' />
            <label>Address</label>
            <input type='text' name='address' placeholder='Enter an address' />
            <label>Phone</label>
            <input type='number' name='phone' placeholder='Enter a cell phone' />
            <label>Ranks</label>
            <select name='ranks'>
              <option hidden>Select a rank</option>
              <option value='Student'>Student</option>
              <option value='Teacher'>Teacher</option>
              <option value='Admin'>Admin</option>
            </select>
            <label>User active</label>
            <select name='userActive'>
              <option hidden />
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </form>
        </ModalUser>

      </div>
    </div>
  );
};

export default Users;