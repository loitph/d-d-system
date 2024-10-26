import { useContext, useEffect, useState } from 'react';
import './Login.css'
import { fakeLogin } from '../../../services/fakeAPI.service';
import { message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth.context';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [formError, setFormError] = useState({
    username: '',
    password: ''
  });

  const { auth, setAuth } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({
      ...loginForm,  // Keep the existing form data
      [name]: value  // Update the changed field
    });
  };

  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const res = await fakeLogin(loginForm);
    if (res.data) {
      message.success("Login successfully");
      localStorage.setItem('access_token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('user_id', res.data.id);

      await setAuth({
        id: res.data.id,
        username: res.data.username,
        token: res.data.token,
      });

      navigate('/');
    } else {
      notification.error({
        message: "Error Login",
        description: 'Login unsuccessfully'
      });
    }
  }

  const regexPattern = /^[a-zA-Z.#@*!$%^]{6,24}$/;
  const validate = () => {
    let valid = true;
    
    if (!regexPattern.test(loginForm.username)) {
      formError.username = 'Username invalid'
      setFormError({...formError});
      valid = false
    } else {
      delete formError.username;
      setFormError({...formError});
    }
    
    if (!regexPattern.test(loginForm.password)) {
      formError.password = 'Password invalid'
      setFormError({...formError});
      valid = false
    } else {
      delete formError.password;
      setFormError({...formError});
    }
    return valid;
  };


  // const authHandler = () => {
  //   const token = localStorage.getItem('access_token');

  //   if (token) {
  //     navigate('/');
  //   }
  // };

  // useEffect(() => {
  //   // authHandler();

  //   console.log(auth);

  // }, [auth]);

  return (
    <>
      <div className="form-wrapper">
        <p>Login component works!</p>


        <div className="mask"></div>
        <div className="form-input">
          <h1>Login</h1>
          <form onSubmit={onLogin}>
            {formError.username && <span className='msg-error'>username error</span>}
            <input
              type='text'
              name='username'
              placeholder='username'
              value={loginForm.username}
              onChange={handleChange}
              className={
                !formError.username ? '' : 'username-error'
              }
            />
            

            {formError.password && <span className='msg-error'>password error</span>}
            <input
              type='password'
              name='password'
              placeholder='password'
              value={loginForm.password}
              onChange={handleChange}
              className={
                !formError.password ? '' : 'password-error'
              }
            />

            <p className='noti'>Username and Password only contain 6-24 characters, which include its uppercase and not digit.</p>
            <p className='noti'>Symbols allow: ., #, @, *, !, $, %, ^</p>

            <button type='submit'>Log in</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;