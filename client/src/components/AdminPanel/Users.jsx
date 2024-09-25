import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './PanelGeneral.module.css';
import edit from '../../images/svg/edit.svg';
import deletee from '../../images/svg/delete.svg';
import Modal from './Modal';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../redux/actions';
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
  ////////////
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
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
    return <img src={spinner} className={style.spinner} alt='' />
  };
  return (
    <div>
      <div className={style.upperContainer}>
        <Button variant="text" onClick={() => dispatch(getUsers())}>All users</Button>
        <Button className={style.buttonCrearProducto} variant="contained" onClick={() => setIsOpen2(true)}>Create user</Button>
        <div className={style.divBuscarOrdenYUsuario}>
          <form>
            <input type='text' placeholder='Search user' />
            <button className={style.buttonBuscar} title='Buscar'><svg className={style.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" /></svg></button>
          </form>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="center">Dni</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Last name</StyledTableCell>
                <StyledTableCell align="center">Date of birth</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Ranks</StyledTableCell>
                <StyledTableCell align="center">User active</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length ? users.map((user) => (
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
                  <StyledTableCell align="center"><img className={style.svg} src={edit} alt='edit' title='Edit' onClick={() => handleClick(user.id)} /><img className={style.svg} src={deletee} alt='delete' title='Delete' onClick={() => dropUser(user.id)} /></StyledTableCell>
                </StyledTableRow>
              )) : <div className={style.sinOrdenes}>
                <p>There are no registered users</p>
              </div>}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal isOpen={isOpen} setIsOpen={setIsOpen} titleModal="Users" dispatch={handleSubmitEdit}>
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
        </Modal>

        <Modal isOpen={isOpen2} setIsOpen={setIsOpen2} titleModal="Users" dispatch={handleSubmitCreate}>
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
        </Modal>

      </div>
    </div>
  );
};

export default Users;