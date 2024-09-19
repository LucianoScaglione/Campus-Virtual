import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./redux/actions";
import './App.scss'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(state);
    if (response.token) {
      setState({ email: '', password: '' });
      navigate('/');
    };
  };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <form onSubmit={handleSubmit} className="LoginBox">

        <div className="LoginBoxHeader">
          <h2>Login</h2>
        </div>

        <div className="LoginBoxContent">
          <TextField id="standard-basic" label="Email" variant="standard" type='email' name='email' value={state.email} placeholder="Enter your email" onChange={handleChange}/>
          <TextField id="standard-basic" label="Password" variant="standard" type='password' name='password' value={state.password} placeholder="Enter your password" onChange={handleChange}/>
          <Button variant="outlined" type='submit' value='Login'>Login</Button>
        </div>
      </form>

    </div>
  );
};

export default Login;