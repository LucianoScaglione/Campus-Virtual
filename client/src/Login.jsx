import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./redux/actions";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type='email' name='email' value={state.email} placeholder="Enter your email" onChange={handleChange} />
        <label>Password</label>
        <input type='password' name='password' value={state.password} placeholder="Enter your password" onChange={handleChange} />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;